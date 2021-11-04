import { GET_USERS_FAILURE, GET_USERS_STARTED, GET_USERS_SUCCESS } from "../const/const";

export const getUsers = () => {
    return (dispatch) => {
        dispatch(getUsersStarted());

        console.log('start dispatch');

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(
                (result) => {
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

export const setActiveUser = (user) => ({
    type: GET_USERS_FAILURE,
    payload: user,
})
