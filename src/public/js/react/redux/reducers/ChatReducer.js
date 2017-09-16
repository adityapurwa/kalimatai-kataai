export default function (state = {
    status: 'idle',
    messages: [],
    currentId: null,
    socket: null,
    input: ''
}, action) {
    switch (action.type) {
        case 'SET_STATUS':
            return Object.assign({}, state, {status: action.payload});
        case 'CLEAR_MESSAGES':
            return Object.assign({}, state, {messages: []});
        case 'ADD_MESSAGE':
            return Object.assign({}, state, {messages: state.messages.concat(action.payload)});
        case 'SET_USER_ID':
            return Object.assign({}, state, {currentId: action.payload});
        case 'SET_CONNECTION':
            return Object.assign({}, state, {socket: action.payload});
        case 'SET_INPUT':
            return Object.assign({}, state, {input: action.payload});
    }
    return Object.assign({}, state);
}