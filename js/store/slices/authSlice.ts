import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },
  reducers: {
    updateCredentials: (state, action) => {
      state = { ...state, ...action.payload };
    },
    resetCredentials: (state) => {
      state.isAuthenticated = false;
      state.token = "";
    },
    updateAuthLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateCredentials, resetCredentials, updateAuthLoadingState } =
  authSlice.actions;

export default authSlice.reducer;
