/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./app/userReducer";
import authReducer from "./app/authReducer";

const rootReducer = {
    user: userReducer,
    auth: authReducer,

};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;