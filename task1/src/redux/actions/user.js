import { GET_USERS_FAILURE, GET_USERS_STARTED, GET_USERS_SUCCESS, SET_ACTIVE_USER } from "../const/const";

export const getUsers = () => {
    return (dispatch) => {
        dispatch(getUsersStarted());

        console.log('start dispatch');

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    dispatch(getUsersSuccess(result));
                },
                (error) => {
                    dispatch(getUsersFailure(error));
                }
            ).catch((error) => {
                dispatch(getUsersFailure(error));
            });
    }
};

const getUsersStarted = () => ({
    type: GET_USERS_STARTED,
})

const getUsersSuccess = (users) => ({
    type: GET_USERS_SUCCESS,
    payload: users,
})

const getUsersFailure = (error) => ({
    type: GET_USERS_FAILURE,
    payload: error,
})

export const setActiveUser = (user) => {
    if (user) {
        localStorage.setItem('login', JSON.stringify(false));
    } else {
        localStorage.setItem('login', JSON.stringify(true));
    }
    return {
        type: SET_ACTIVE_USER,
        payload: user,
    }
};
