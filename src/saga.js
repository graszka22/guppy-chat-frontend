import { all, fork, takeEvery, take, put, call, race } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { actionType } from './reducers';
import { WEBSOCKET_ADDRESS, SERVER_ADDRESS } from './config';

function* watchWebsocketInput(socket) {
    while(true) {
        const { data, command } = yield take(actionType.SEND_TO_WEBSOCKET);
        const token = "7cc762d72861b5a32d51f4227a47b8f6";
        socket.send(JSON.stringify({
            data, command, token
        }));
    }
}

function* watchWebsocketOutput(channel) {
    while(true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function makeWebsocketChannel(socket) {
    return eventChannel((emitter) => {
        socket.onopen = e => emitter({ type: actionType.WEBSOCKET_CONNECT_SUCCESS });
        socket.onmessage = e => emitter({ type: actionType.WEBSOCKET_MESSAGE, data: JSON.parse(e.data) });
        socket.onerror = e => console.log(e);
        return () => {
            socket.close();
        }
    });
}

function getWebsocket() {
    return new WebSocket(WEBSOCKET_ADDRESS);
}

function* websocketConnect() {
    const socket = getWebsocket();
    const socketChannel = yield call(makeWebsocketChannel, socket);
    const { cancel } = yield race({
        task: all([call(watchWebsocketInput, socket), call(watchWebsocketOutput, socketChannel)]),
        cancel: take(actionType.STOP_WEBSOCKET),
    });
    if(cancel) {
        socketChannel.close();
    }
}

function* watchWebsocketConnect() {
    yield takeEvery(actionType.WEBSOCKET_CONNECT, websocketConnect);
}

function* handleReceiveMessage({ data }) {
    yield put({
        type: actionType.RECEIVE_MESSAGE,
        message: data,
    });
}

function* handleGetMessagesResponse({ messages }) {
    yield put({
        type: actionType.GET_MESSAGES_SUCCESS,
        messages,
    });
}

const websocketMessagesHandlers = {
    RECEIVE_MESSAGE: handleReceiveMessage,
    GET_MESSAGES_RESPONSE: handleGetMessagesResponse,
};

function* handleWebsocketMessage({ data }) {
    yield call(websocketMessagesHandlers[data.command], data);
}

function* watchWebsocketMessage() {
    yield takeEvery(actionType.WEBSOCKET_MESSAGE, handleWebsocketMessage);
}

function* handleSendMessage({ message }) {
    yield put({
        type: actionType.SEND_TO_WEBSOCKET,
        data: {
            userId: 7,
            to: 8,
            message,
        },
        command: "SEND_MESSAGE"
    })
}

function* watchSendMessage() {
    yield takeEvery(actionType.SEND_MESSAGE, handleSendMessage);
}

function* handleGetMessages({ friendId }) {
    yield put({
        type: actionType.SEND_TO_WEBSOCKET,
        data: {
            userId: 7,
            friendId: 8,
        },
        command: "GET_MESSAGES",
    });
}

function* watchGetMessages() {
    yield takeEvery(actionType.GET_MESSAGES, handleGetMessages);
}

function* handleLogin({ username, password }) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    console.log(username, password);
    const response = yield fetch(`${SERVER_ADDRESS}/login`, {
        method: 'POST',
        body: formData,
    });
    const token = yield response.text();
    yield put({
        type: actionType.LOGIN_SUCCESS,
        token,
    });
}

function* watchLogin() {
    yield takeEvery(actionType.LOGIN, handleLogin);
}

function* handleRegister({ username, email, password }) {

}

function* watchRegister() {
    yield takeEvery(actionType.REGISTER, handleRegister);
}

export default function* saga() {
    yield all([
        fork(watchWebsocketConnect),
        fork(watchWebsocketMessage),
        fork(watchSendMessage),
        fork(watchGetMessages),
        fork(watchLogin),
        fork(watchRegister),
    ]);
};