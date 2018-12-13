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
            content: "Hello world",
            user: "Aldebrand",
            avatar: "https://picsum.photos/100/100/?random",
        },
        {
            content: "Hello my love <3",
            user: "me",
        },
        {
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            user: "me",
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta gravida massa, a dignissim sem convallis quis. Nunc sit amet lacus vehicula, blandit lacus a, ullamcorper urna. Proin quis est vitae neque auctor dignissim non et ante. In non diam a libero interdum fringilla. Nunc ut vulputate felis. Vestibulum vehicula erat justo, ut venenatis sapien tincidunt sed. Morbi in fermentum libero. Nulla lobortis ante vel diam eleifend rhoncus. Morbi fringilla semper nibh, non posuere nibh maximus eu. Quisque lobortis turpis sed erat malesuada faucibus. Integer vehicula odio eget mauris suscipit vehicula. Donec euismod purus semper, laoreet tortor eget, bibendum tortor. Donec sed ultrices velit. Maecenas at molestie mauris, eget suscipit est.",
            user: "Aldebrand",
            avatar: "https://picsum.photos/100/100/?random",
        },
        {
            content: "<3",
            user: "me",
        },
        {
            content: "Cras porttitor, leo sed malesuada imperdiet, lorem diam venenatis dui, sit amet accumsan diam ante in nulla. Fusce erat diam, rutrum eget neque sit amet, suscipit pharetra arcu. Praesent elementum imperdiet commodo. Sed auctor libero sit amet mauris semper, condimentum finibus eros eleifend. Phasellus at tellus eget augue interdum volutpat ultrices laoreet erat. Praesent interdum nibh non aliquet efficitur. Pellentesque a nisl sed tortor venenatis fermentum. In vel libero nunc. Etiam molestie orci vitae mauris ultrices semper.",
            user: "Aldebrand",
            avatar: "https://picsum.photos/100/100/?random",
        }
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
    sendMessage() {
        return {
            type: actionType.SEND_MESSAGE,
        }
    },
};

export default function reducer(state=initialState, action) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
};
