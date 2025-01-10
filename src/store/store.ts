import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    account: cartReducer,
  },
});

export default store;
