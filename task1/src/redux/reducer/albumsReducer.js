export default function albumReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_ALBUM':
            return state.concat([action.payload]);
        default:
            return state;
    }
}