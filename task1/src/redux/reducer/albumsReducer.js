import { ADD_ALBUM_FAILURE, ADD_ALBUM_STARTED, ADD_ALBUM_SUCCESS, GET_ALBUMS_FAILURE, GET_ALBUMS_STARTED, GET_ALBUMS_SUCCESS, SET_ALBUMS } from "../const/const";

const initialState = {
    albums: [],
    albumsLoaded: true,
    albumAdded: true,
    additionalAlbums: [],
    error: null,
    activeAlbumInfo: { albumId: null, photos: [] },
}

export default function albumReducer(state = initialState, action) {
    switch (action.type) {
        // get albums reducers
        case GET_ALBUMS_STARTED:
            return {
                ...state,
                albumsLoaded: false,
            }
        case GET_ALBUMS_SUCCESS:
            return {
                ...state,
                albumsLoaded: true,
                albums: action.payload,
            }
        case GET_ALBUMS_FAILURE:
            return {
                ...state,
                albumsLoaded: true,
                error,
            };

        // add albums reducers
        case ADD_ALBUM_STARTED:
            return {
                ...state,
                albumAdded: false,
            }
        case ADD_ALBUM_SUCCESS:
            return {
                ...state,
                albumAdded: true,
                additionalAlbums: [action.payload, ...state.additionalAlbums],
            }
        case ADD_ALBUM_FAILURE:
            return {
                ...state,
                albumAdded: true,
                error,
            };
        default:
            return state;
    }
}