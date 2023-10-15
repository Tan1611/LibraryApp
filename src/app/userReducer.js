// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: {}
})

const {reducer: userReducer} = userSlice;
export default userReducer;