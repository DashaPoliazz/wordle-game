import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modal";
import { settingsReducer } from "./slices/settings";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
