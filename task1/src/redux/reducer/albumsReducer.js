import { ADD_ALBUM_FAILURE, ADD_ALBUM_STARTED, ADD_ALBUM_SUCCESS, SET_ALBUMS } from "../const/const";

export default function albumReducer(state = { albums: [], isLoaded: true, error: null }, action) {
    switch (action.type) {
        case SET_ALBUMS:
            return {
                ...state,
                albums: action.payload,
            }
        case ADD_ALBUM_STARTED:
            return {
                ...state,
                isLoaded: false,
            }
        case ADD_ALBUM_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                albums: [...state.albums, action.payload],
            }
        case ADD_ALBUM_FAILURE:
            return {
                ...state,
                isLoaded: true,
                error,
            };
        default:
            return state;
    }
}