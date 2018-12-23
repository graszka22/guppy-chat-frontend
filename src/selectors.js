export const userTokenSelector = state => state.userToken;

export const userIdSelector = state => state.userId;

export const getUserDataById = (state, userId) => state.friends[userId];