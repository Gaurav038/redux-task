import { configureStore } from "@reduxjs/toolkit";
import formDetailsReducer from "./slices/formDetailsSlice";

export const store = configureStore({
    reducer: formDetailsReducer
})