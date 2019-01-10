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
    LOGIN_FAILED: "LOGIN_FAILED",
    REGISTER: "REGISTER",
    REGISTER_SUCESS: "REGISTER_SUCCESS",
    REGISTER_FAILED: "REGISTER_FAILED",
    FETCH_FRIENDS: "FETCH_FRIENDS",
    FETCH_FRIENDS_SUCCESS: "FETCH_FRIENDS_SUCCESS",
    SEARCH_FRIENDS: "SEARCH_FRIENDS",
    SEARCH_FRIENDS_SUCCESS: "SEARCH_FRIENDS_SUCCESS",
    LOGOUT: "LOGOUT",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    ADD_FRIEND: "ADD_FRIEND",
    ADD_FRIEND_SUCCESS: "ADD_FRIEND_SUCCESS",
};


const initialState = {
    messages: {
        // map user -> array of messages with the user, loading state
    },
    friends: {

    },
    searchFriends: {
        results: [],
        loading: false,
    },
    connected: false,
};

const handlers = {
    [actionType.WEBSOCKET_CONNECT_SUCCESS]: state => ({ ...state, connected: true }),
    [actionType.SEND_MESSAGE]: (state, action) => ({
        ...state,
        messages: {
            ...state.messages,
            [action.receiverId]: {
                ...state.messages[action.receiverId],
                messages: [
                    ...state.messages[action.receiverId].messages,
                    {
                        text: action.message,
                        senderId: state.userId,
                        receiverId: action.receiverId,
                    },
                ],
            },
        },
    }),
    [actionType.RECEIVE_MESSAGE]: (state, { message }) => ({
        ...state,
        messages: {
            ...state.messages,
            [message.senderId]: {
                ...state.messages[message.senderId],
                messages: [
                    ...state.messages[message.senderId].messages,
                    message,
                ],
            },
        },
    }),
    [actionType.GET_MESSAGES]: (state, action) => ({
        ...state,
        messages: {
            ...state.messages,
            [action.friendId]: {
                ...state.messages[action.friendId],
                loading: true,
            },
        },
    }),
    [actionType.GET_MESSAGES_SUCCESS]: (state, action) => {
        const newMin = Math.min(...action.messages.map(message => message.messageId));
        return ({
        ...state,
        messages: {
            ...state.messages,
            [action.friendId]: {
                messages: [...action.messages.reverse(), ...(state.messages[action.friendId].messages || [])],
                minMessageId: isFinite(newMin) ? newMin : state.messages[action.friendId].minMessageId,
                loading: false,
            },
        },
    })},
    [actionType.LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        userToken: action.token,
        userId: action.userId,
    }),
    [actionType.FETCH_FRIENDS_SUCCESS]: (state, action) => ({
        ...state,
        friends: action.friends.reduce((res, it) => {
            res[it.userId] = it;
            return res;
        }, {}),
        friendsLoaded: true,
    }),
    [actionType.SEARCH_FRIENDS]: (state) => ({
        ...state,
        searchFriends: {
            ...state.searchFriends,
            loading: true,
        }
    }),
    [actionType.SEARCH_FRIENDS_SUCCESS]: (state, action) => ({
        ...state,
        searchFriends: {
            results: action.results,
            loading: false,
        }
    }),
    [actionType.LOGOUT_SUCCESS]: () => initialState,
    [actionType.ADD_FRIEND_SUCCESS]: (state, action) =>({
        ...state,
        friends: {
            ...state.friends,
            [action.friendId]: {
                userId: action.friendId,
                username: action.friendUsername,
            }
        }
    }),
    [actionType.LOGIN]: (state) => ({
        ...state,
        loginError: null,
    }),
    [actionType.LOGIN_FAILED]: (state) => ({
        ...state,
        loginError: true,
    }),
    [actionType.REGISTER]: (state) => ({
        ...state,
        registerError: null,
    }),
    [actionType.REGISTER_FAILED]: (state) => ({
        ...state,
        registerError: true,
    }),
};

export const actionCreator = {
    connectToWebsocket: () => ({
        type: actionType.WEBSOCKET_CONNECT,
    }),
    sendMessage: (message, receiverId) => ({
        type: actionType.SEND_MESSAGE,
        message,
        receiverId
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
    fetchFriends: () => ({
        type: actionType.FETCH_FRIENDS,
    }),
    searchFriends: searchPhrase => ({
        type: actionType.SEARCH_FRIENDS,
        searchPhrase,
    }),
    logout: () => ({
        type: actionType.LOGOUT,
    }),
    addFriend: friendId => ({
        type: actionType.ADD_FRIEND,
        friendId,
    }),
};

export default function reducer(state=initialState, action) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
};
