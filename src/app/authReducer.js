import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('account')) || null,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("account", JSON.stringify(action.payload.accessToken));
      state.currentUser = action.payload.accessToken;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.clear();
    },
  },
});

const { reducer, actions } = authSlice;
export const { login, logout } = actions;
export default reducer;
