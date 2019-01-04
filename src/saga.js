import { all, fork, takeEvery, take, put, call, race, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { actionType } from './reducers';
import { WEBSOCKET_ADDRESS, SERVER_ADDRESS } from './config';
import { userTokenSelector, userIdSelector } from './selectors';
import { navigate } from './Navigation';

function* watchWebsocketInput(socket) {
    while(true) {
        const { data, command } = yield take(actionType.SEND_TO_WEBSOCKET);
        const token = yield select(userTokenSelector);
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

function* handleGetFriendsResponse({ friends }) {
    yield put({
        type: actionType.FETCH_FRIENDS_SUCCESS,
        friends,
    });
}

function* handleSearchFriendsResponse({ results }) {
    yield put({
        type: actionType.SEARCH_FRIENDS_SUCCESS,
        results,
    });
}

function* handleLogoutResponse() {
    yield put({
        type: actionType.LOGOUT_SUCCESS,
    });
    navigate('Login');
}

const websocketMessagesHandlers = {
    RECEIVE_MESSAGE: handleReceiveMessage,
    GET_MESSAGES_RESPONSE: handleGetMessagesResponse,
    GET_FRIENDS_RESPONSE: handleGetFriendsResponse,
    SEARCH_FRIENDS_RESPONSE: handleSearchFriendsResponse,
    LOGOUT_RESPONSE: handleLogoutResponse,
};

function* handleWebsocketMessage({ data }) {
    yield call(websocketMessagesHandlers[data.command], data);
}

function* watchWebsocketMessage() {
    yield takeEvery(actionType.WEBSOCKET_MESSAGE, handleWebsocketMessage);
}

function* handleSendMessage({ message, receiverId }) {
    const userId = yield select(userIdSelector);
    yield put({
        type: actionType.SEND_TO_WEBSOCKET,
        data: {
            userId,
            to: receiverId,
            message,
        },
        command: "SEND_MESSAGE"
    })
}

function* watchSendMessage() {
    yield takeEvery(actionType.SEND_MESSAGE, handleSendMessage);
}

function* handleGetMessages({ friendId }) {
    const userId = yield select(userIdSelector);
    yield put({
        type: actionType.SEND_TO_WEBSOCKET,
        data: {
            userId,
            friendId,
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
    const response = yield fetch(`${SERVER_ADDRESS}/login`, {
        method: 'POST',
        body: formData,
    });
    const { token, userId } = yield response.json();
    yield put({
        type: actionType.LOGIN_SUCCESS,
        token,
        userId
    });
    navigate('Chat');
}

function* watchLogin() {
    yield takeEvery(actionType.LOGIN, handleLogin);
}

function* handleRegister({ username, email, password }) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    const response = yield fetch(`${SERVER_ADDRESS}/register`, {
        method: 'POST',
        body: formData,
    });
    const { token, userId } = yield response.json();
    yield put({
        type: actionType.LOGIN_SUCCESS,
        token,
        userId
    });
}

function* watchRegister() {
    yield takeEvery(actionType.REGISTER, handleRegister);
}

function* handleFetchFriends() {
    const userId = yield select(userIdSelector);
    yield put({
        type: actionType.SEND_TO_WEBSOCKET,
        data: {
            userId,
        },
        command: "GET_FRIENDS",
    });
}

function* watchFetchFriends() {
    yield takeEvery(actionType.FETCH_FRIENDS, handleFetchFriends);
}

function* handleSearchFriends({ searchPhrase }) {
    yield put({
        type: actionType.SEND_TO_WEBSOCKET,
        data: {
            searchPhrase,
        },
        command: "SEARCH_FRIENDS",
    });
}

function* watchSearchFriends() {
    yield takeEvery(actionType.SEARCH_FRIENDS, handleSearchFriends);
}

function* handleLogout() {
    yield put({
        type: actionType.SEND_TO_WEBSOCKET,
        data: {},
        command: "LOGOUT",
    });
}

function* watchLogout() {
    yield takeEvery(actionType.LOGOUT, handleLogout);
}

export default function* saga() {
    yield all([
        fork(watchWebsocketConnect),
        fork(watchWebsocketMessage),
        fork(watchSendMessage),
        fork(watchGetMessages),
        fork(watchLogin),
        fork(watchRegister),
        fork(watchFetchFriends),
        fork(watchSearchFriends),
        fork(watchLogout),
    ]);
};