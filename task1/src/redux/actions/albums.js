import { ADD_ALBUM_FAILURE, ADD_ALBUM_STARTED, ADD_ALBUM_SUCCESS, SET_ALBUMS } from "../const/const";

export const setAlbums = (albums) => ({
    type: SET_ALBUMS,
    payload: albums,
});

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
                setState((prevState) => ({
                    ...prevState,
                    additionalAlbums: prevState.additionalAlbums.concat([newAlbum]),
                }));
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