import { all, fork, takeEvery, take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { actionType } from './reducers';
import { WEBSOCKET_ADDRESS } from './config';

function* watchWebsocketInput(socket) {
    while(true) {
        const { data } = yield take(actionType.SEND_TO_WEBSOCKET);
        socket.send(JSON.stringify(data));
    }
}

function* watchWebsocketOutput(channel) {
    while(true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function* makeWebsocketChannel(socket) {
    return eventChannel(emittter => {
        socket.onopen = e => emittter({ type: actionType.WEBSOCKET_CONNECT_SUCCESS });
        socket.onmessage = e => emitter({ type: actionType.WEBSOCKET_MESSAGE, data: e.data });
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
        task: all([call(watchWebsocketInput, socket), call(watchWebsocketOutput, channel)]),
        cancel: take(actionType.STOP_WEBSOCKET),
    });
    if(cancel) {
        socketChannel.close();
    }
}

function* watchWebsocketConnect() {
    yield takeEvery(actionType.WEBSOCKET_CONNECT, websocketConnect);
}

function* handleWebsocketMessage(action) {
    console.log(action.data);
}

function* watchWebsocketMessage() {
    yield takeEvery(actionType.WEBSOCKET_MESSAGE, handleWebsocketMessage);
}

export default function* saga() {

    yield all([
        fork(watchWebsocketConnect),
        fork(watchWebsocketMessage),
        //fork(watchReceiveMessageSaga),
    ]);
};