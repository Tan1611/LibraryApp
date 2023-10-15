/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./app/userReducer";

const rootReducer = {
    user: userReducer,

};

const store = configureStore({
    reducer: rootReducer,
});

export default store;