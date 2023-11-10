// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import usersApi from "src/api/usersApi";

export const getMe = createAsyncThunk('user/getMe', async(params, thunkAPI) =>{
    const currentUser = await usersApi.getMe();
    return currentUser;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [getMe.pending]: (state) => {
            state.loading = true;
        },
        [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMe.fulfilled]: (state, action) => {
            state.loading = false;
            state.current = action.payload;
        }
    }
})

const {reducer: userReducer} = userSlice;
export default userReducer;