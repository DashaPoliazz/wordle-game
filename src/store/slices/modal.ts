import { createSlice } from "@reduxjs/toolkit";

interface IState {
  isModal: boolean;
}

const initialState: IState = {
  isModal: false,
};

export const modalSlice = createSlice({
  name: "ModalWindowSlice",
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModal = !state.isModal;
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
