import { ADD_ALBUM_FAILURE, ADD_ALBUM_STARTED, ADD_ALBUM_SUCCESS, GET_ALBUMS_FAILURE, GET_ALBUMS_STARTED, GET_ALBUMS_SUCCESS, SET_ACTIVE_ALBUM, SET_ALBUMS } from "../const/const";

// get albums actions

export const getAlbums = () => {
    return (dispatch) => {
        dispatch(getAlbumsStarted());

        fetch("https://jsonplaceholder.typicode.com/albums")
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(getAlbumsSuccess(result));
                },
                (error) => {
                    dispatch(getAlbumsFailure(error));
                }
            ).catch((error) => {
                dispatch(getAlbumsFailure(error));
            });
    }
};

const getAlbumsStarted = () => ({
    type: GET_ALBUMS_STARTED,
})

const getAlbumsSuccess = (albums) => ({
    type: GET_ALBUMS_SUCCESS,
    payload: albums,
})

const getAlbumsFailure = (error) => ({
    type: GET_ALBUMS_FAILURE,
    payload: error,
})

// add album actions

export const addAlbum = ({ id, title }) => {
    return (dispatch) => {
        dispatch(addAlbumStarted());

        const newAlbum = { id, title };

        fetch('https://jsonplaceholder.typicode.com/albums', {
                method: 'POST',
                body: JSON.stringify(newAlbum),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then(() => {
                dispatch(addAlbumSuccess(newAlbum));
            })
            .catch((error) => {
                dispatch(addAlbumFailure(error));
            });
    }
};

const addAlbumStarted = () => ({
    type: ADD_ALBUM_STARTED,
})

const addAlbumSuccess = (album) => ({
    type: ADD_ALBUM_SUCCESS,
    payload: album,
})

const addAlbumFailure = (error) => ({
    type: ADD_ALBUM_FAILURE,
    payload: error,
})

// set active album

export const setActiveAlbum = ({ albumId, photos }) => ({
    type: SET_ACTIVE_ALBUM,
    payload: { albumId, photos },
})
