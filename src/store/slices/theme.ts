import { createSlice } from "@reduxjs/toolkit";

interface IState {
  theme: "dark" | "light";
}

const initialState: IState = {
  theme: "dark",
};

export const modalSlice = createSlice({
  name: "ModalWindowSlice",
  initialState,
  reducers: {
    toggleTheme(state) {
      const currentTheme = state.theme;
      state.theme = currentTheme === "dark" ? "light" : "dark";
    },
  },
});

export const themeActions = modalSlice.actions;
export const themeReducer = modalSlice.reducer;
