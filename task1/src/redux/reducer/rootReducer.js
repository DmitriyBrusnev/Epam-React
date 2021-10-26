import { combineReducers } from "redux";
import photoReducer from "./photosReducer";
import albumReducer from "./albumsReducer";

const rootReducer = combineReducers({ photos: photoReducer, albums: albumReducer });

export default rootReducer;