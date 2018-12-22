export const actionType = {
    WEBSOCKET_CONNECT: "WEBSOCKET_CONNECT",
    WEBSOCKET_CONNECT_SUCCESS: "WEBSOCKET_CONNECT_SUCCESS",
    STOP_WEBSOCKET: "STOP_WEBSOCKET",
    SEND_TO_WEBSOCKET: "SEND_TO_WEBSOCKET",
    WEBSOCKET_MESSAGE: "WEBSOCKET_MESSAGE",
    GET_MESSAGES: "GET_MESSAGES",
    SEND_MESSAGE: "SEND_MESSAGE",
    RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
};


const initialState = {
    messages: [
        // map user -> array of messages with the user, loading state
        {
            senderId: 7,
            receiverId: 8,
            text: "raz raz"
        },
        {
            senderId: 8,
            receiverId: 7,
            text: "dwa dwa",
        },
    ],
    friends: [
        {
            id: 8,
            name: 'Aldebrand Alayna',
            status: 'Active now',
            activeNow: true,
            avatar: 'https://picsum.photos/100/100/?random',
        },
        {
            name: 'Margarit Corrine',
            status: 'Active 6h ago',
            activeNow: false,
            avatar: 'https://picsum.photos/100/100/?random',
        },
        {
            name: 'Klavdiya Margrét',
            status: 'Active 20 minutes ago',
            activeNow: false,
            avatar: 'https://picsum.photos/100/100/?random',
        },
        {
            name: 'Klara Felix',
            status: 'Active now',
            activeNow: true,
            avatar: 'https://picsum.photos/100/100/?random',
        },
    ],
    connected: false,
};

const handlers = {
    [actionType.WEBSOCKET_CONNECT_SUCCESS]: state => ({ ...state, connected: true }),
    [actionType.SEND_MESSAGE]: (state, action) => ({
        ...state,
        messages: [
            ...state.messages,
            {
                text: action.message,
                senderId: 7,
                receiverId: 8,
            },
        ],
    }),
    [actionType.RECEIVE_MESSAGE]: (state, action) => ({
        ...state,
        messages: [
            ...state.messages,
            action.message,
        ],
    }),
};

export const actionCreator = {
    connectToWebsocket: () => ({
        type: actionType.WEBSOCKET_CONNECT,
    }),
    getMessages() {
        return {
            type: actionType.GET_MESSAGES,
        }
    },
    sendMessage(message) {
        return {
            type: actionType.SEND_MESSAGE,
            message
        }
    },
    sendToWebsocket(command, data) {
        return {
            type: actionType.SEND_TO_WEBSOCKET,
            data,
            command
        };
    },
};

export default function reducer(state=initialState, action) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
};
