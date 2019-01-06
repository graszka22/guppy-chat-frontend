export const userTokenSelector = state => state.userToken;

export const userIdSelector = state => state.userId;

export const getUserDataById = (state, userId) => state.friends[userId];

export const messagesSelector = (state, friendId) => {
    if (state.messages[friendId]) {
        return state.messages[friendId].messages || [];
    }
    return [];
}

export const isLoadingMessagesSelector = (state, friendId) => {
    if (state.messages[friendId])
        return state.messages[friendId].loading;
    return true;
}

export const minMessageIdSelector = (state, friendId) => {
    if (state.messages[friendId])
        return state.messages[friendId].minMessageId || -1;
    return -1;
}