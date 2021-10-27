import { GET_ALBUM_PHOTOS_FAILURE, GET_ALBUM_PHOTOS_STARTED, GET_ALBUM_PHOTOS_SUCCESS } from "../const/const";
import { setActiveAlbum } from "./albums";

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
