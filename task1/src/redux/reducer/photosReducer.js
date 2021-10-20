export default function photoReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_PHOTO':
            return state.concat([action.payload]);
        default:
            return state;
    }
}