import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modal";
import { settingsReducer } from "./slices/settings";
import { themeReducer } from "./slices/theme";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    settings: settingsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
