import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/slices/modal";
import { settingsActions } from "../store/slices/settings";
import { themeActions } from "../store/slices/theme";

const actions = {
  ...modalActions,
  ...settingsActions,
  ...themeActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
