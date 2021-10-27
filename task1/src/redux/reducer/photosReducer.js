import { ADD_ALBUM_PHOTO_FAILURE, ADD_ALBUM_PHOTO_STARTED, ADD_ALBUM_PHOTO_SUCCESS, GET_ALBUM_PHOTOS_FAILURE, GET_ALBUM_PHOTOS_STARTED, GET_ALBUM_PHOTOS_SUCCESS } from "../const/const";

const initialState = {
    photos: [],
    photosLoaded: true,
    photoAdded: true,
    additionalPhotos: [],
    photosLoadError: null,
    photosAddError: null,
};

export default function photoReducer(state = initialState, action) {
    switch (action.type) {

        // get albums photo

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
            
        // add album photo

        case ADD_ALBUM_PHOTO_STARTED:
            return {
                ...state,
                photoAdded: false,
            };
        case ADD_ALBUM_PHOTO_SUCCESS:
            return {
                ...state,
                photoAdded: true,
                additionalPhotos: [...state.additionalPhotos, action.payload],
            };
        case ADD_ALBUM_PHOTO_FAILURE:
            return {
                ...state,
                photoAdded: true,
                photosAddError: action.payload,
            };
        default:
            return state;
    }
}