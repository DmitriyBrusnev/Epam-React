import { GET_ALBUM_PHOTOS_FAILURE, GET_ALBUM_PHOTOS_STARTED, GET_ALBUM_PHOTOS_SUCCESS } from "../const/const";

const initialState = {
    photos: [],
    photosLoaded: true,
    photoAdded: true,
    additionalPhotos: [],
    photosLoadError: null,
};

export default function photoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALBUM_PHOTOS_STARTED:
            return {
                ...state,
                photosLoaded: false,
            };
        case GET_ALBUM_PHOTOS_SUCCESS:
            return {
                ...state,
                photosLoaded: true,
                photos: action.payload,
            };
        case GET_ALBUM_PHOTOS_FAILURE:
            return {
                ...state,
                photosLoaded: true,
                photosLoadError: action.payload,
            };
        default:
            return state;
    }
}