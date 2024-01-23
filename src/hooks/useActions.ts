import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/slices/modal";
import { settingsActions } from "../store/slices/settings";

const actions = {
  ...modalActions,
  ...settingsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
