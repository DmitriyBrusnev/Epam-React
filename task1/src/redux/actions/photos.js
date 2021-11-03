import { GET_ALBUM_PHOTOS_FAILURE, GET_ALBUM_PHOTOS_STARTED, GET_ALBUM_PHOTOS_SUCCESS,
    ADD_ALBUM_PHOTO_STARTED, ADD_ALBUM_PHOTO_SUCCESS, ADD_ALBUM_PHOTO_FAILURE } from "../const/const";
import { setActiveAlbum } from "./albums";

// get an album photo

export const getAlbumPhotos = (albumId) => {
    return (dispatch) => {
        dispatch(getAlbumPhotosStarted());
        dispatch(setActiveAlbum({ albumId, photos: [] }));

        fetch(`https://jsonplaceholder.typicode.com/albums/${ albumId }/photos`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(getAlbumPhotosSuccess(result));
                    dispatch(setActiveAlbum({ albumId, photos: result }));
                },
                (error) => {
                    dispatch(getAlbumPhotosFailure(error));
                }
            ).catch((error) => {
                dispatch(getAlbumPhotosFailure(error));
            });
    }
};

const getAlbumPhotosStarted = () => ({
    type: GET_ALBUM_PHOTOS_STARTED,
})

const getAlbumPhotosSuccess = (albumPhotos) => ({
    type: GET_ALBUM_PHOTOS_SUCCESS,
    payload: albumPhotos,
})

const getAlbumPhotosFailure = (error) => ({
    type: GET_ALBUM_PHOTOS_FAILURE,
    payload: error,
})

// add album actions

export const addAlbumPhoto = ({ id, albumId, url }) => {
    return (dispatch) => {
        dispatch(addAlbumPhotoStarted());

        const newPhoto = { id, albumId, url };

        fetch('https://jsonplaceholder.typicode.com/photos', {
                method: 'POST',
                body: JSON.stringify(newPhoto),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then(() => {
                dispatch(addAlbumPhotoSuccess(newPhoto));
            })
            .catch((error) => {
                dispatch(addAlbumPhotoFailure(error));
            });
    }
};

const addAlbumPhotoStarted = () => ({
    type: ADD_ALBUM_PHOTO_STARTED,
})

const addAlbumPhotoSuccess = (photo) => ({
    type: ADD_ALBUM_PHOTO_SUCCESS,
    payload: photo,
})

const addAlbumPhotoFailure = (error) => ({
    type: ADD_ALBUM_PHOTO_FAILURE,
    payload: error,
})