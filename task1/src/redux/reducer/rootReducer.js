import { combineReducers } from "redux";
import photoReducer from "./photosReducer";
import albumReducer from "./albumsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({ photos: photoReducer, albums: albumReducer, user: userReducer });

export default rootReducer;