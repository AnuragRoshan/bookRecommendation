// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice";
// import other reducers as needed

const rootReducer = combineReducers({
    user: userReducer,
    // add other slices of state here
});

export default rootReducer;
