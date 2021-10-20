import { combineReducers } from "redux";
import photoReducer from "./photosReducer";
import albumReducer from "./albumsReducer";

const rootReducer = combineReducers(photoReducer, albumReducer);

export default rootReducer;