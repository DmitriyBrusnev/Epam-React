import { GET_USERS_FAILURE, GET_USERS_STARTED, GET_USERS_SUCCESS, SET_ACTIVE_USER } from "../const/const";

const initialState = {
    users: [],
    usersLoading: false,
    activeUser: null,
    usersLoadError: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        // get albums reducers
        case GET_USERS_STARTED:
            return {
                ...state,
                usersLoading: true,
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                usersLoading: false,
                users: action.payload,
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                usersLoading: false,
                usersLoadError: action.payload,
            };

        // set active user
        case SET_ACTIVE_USER:
            return {
                ...state,
                activeUser: action.payload,
            }

        default:
            return state;
    }
}
