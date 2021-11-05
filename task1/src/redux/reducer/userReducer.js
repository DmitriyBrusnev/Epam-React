import { GET_USERS_FAILURE, GET_USERS_STARTED, GET_USERS_SUCCESS, SET_ACTIVE_USER } from "../const/const";

const initialState = {
    users: [],
    usersLoading: false,
    activeUser: null,
    usersLoadError: null,
    // "id": 1,
    // "name": "Leanne Graham",
    // "username": "Bret",
    // "email": "Sincere@april.biz",
    // "address": {
    //     "street": "Kulas Light",
    //     "suite": "Apt. 556",
    //     "city": "Gwenborough",
    //     "zipcode": "92998-3874",
    //     "geo": {
    //         "lat": "-37.3159",
    //         "lng": "81.1496"
    //     }
    // },
    // "phone": "1-770-736-8031 x56442",
    // "website": "hildegard.org",
    // "company": {
    //     "name": "Romaguera-Crona",
    //     "catchPhrase": "Multi-layered client-server neural-net",
    //     "bs": "harness real-time e-markets"
    // }
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
