import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultOptions } from "../../utils/defaultOptions";
import { DEFAULT_WORD_LENGTH } from "../../constants";
import { IConfigOption } from "../../types/types";

const defaultOptions = getDefaultOptions();

interface IState {
  options: IConfigOption[];
  wordLength: number;
}

const initialState: IState = {
  options: defaultOptions,
  wordLength: DEFAULT_WORD_LENGTH,
};

export const settingsSlice = createSlice({
  name: "ModalWindowSlice",
  initialState,
  reducers: {
    setWordLength(state, action: PayloadAction<number>) {
      state.wordLength = action.payload;
    },
    toggleOption(state, action: PayloadAction<string>) {
      const title = action.payload;
      const option = state.options.find((o) => o.title === title);
      if (option) option.isChecked = !option.isChecked;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
