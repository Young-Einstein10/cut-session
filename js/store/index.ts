import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import counterSlice from "./slices/counterSlice";
import merchantSlice from "./slices/merchantSlice";

const store = configureStore({
  reducer: {
    count: counterSlice,
    auth: authSlice,
    merchant: merchantSlice,
  },
});

export default store;
