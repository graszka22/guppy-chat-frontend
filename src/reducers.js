export const actionType = {
    WEBSOCKET_CONNECT: "WEBSOCKET_CONNECT",
    WEBSOCKET_CONNECT_SUCCESS: "WEBSOCKET_CONNECT_SUCCESS",
    STOP_WEBSOCKET: "STOP_WEBSOCKET",
    SEND_TO_WEBSOCKET: "SEND_TO_WEBSOCKET",
    WEBSOCKET_MESSAGE: "WEBSOCKET_MESSAGE",
    GET_MESSAGES: "GET_MESSAGES",
    GET_MESSAGES_SUCCESS: "GET_MESSAGES_SUCCESS",
    SEND_MESSAGE: "SEND_MESSAGE",
    RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
    LOGIN: "LOGIN",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    REGISTER: "REGISTER",
    REGISTER_SUCESS: "REGISTER_SUCCESS",
};


const initialState = {
    messages: [
        // map user -> array of messages with the user, loading state
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
    [actionType.GET_MESSAGES]: (state) => ({
        ...state,
        loadingMessages: true,
    }),
    [actionType.GET_MESSAGES_SUCCESS]: (state, action) => ({
        ...state,
        messages: action.messages,
        loadingMessages: false,
    }),
    [actionType.LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        userToken: action.token,
    }),
    [actionType.REGISTER_SUCESS]: (state, action) => ({

    }),
};

export const actionCreator = {
    connectToWebsocket: () => ({
        type: actionType.WEBSOCKET_CONNECT,
    }),
    sendMessage: (message) => ({
        type: actionType.SEND_MESSAGE,
        message
    }),
    getMessages: (friendId) => ({
        type: actionType.GET_MESSAGES,
        friendId,
    }),
    login: (username, password) => ({
        type: actionType.LOGIN,
        username,
        password,
    }),
    register: (username, email, password) => ({
        type: actionType.REGISTER,
        username, 
        email,
        password,
    }),
};

export default function reducer(state=initialState, action) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
};
