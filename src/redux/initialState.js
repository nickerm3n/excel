import {defaultStyles} from "@/constants";
import {clone} from "@core/utils";

const defaultState = {
  tableName: "Новая таблица",
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: "",
  currentStyles: defaultStyles,
  lastUpdate: new Date().toJSON(),
};

const normalize = (state) => {
  return {
    ...state,
    currentText: "",
    currentStyles: defaultStyles,
  }
};

export const normalizeInitialState = (state) => {
  return state ? normalize(state) : clone(defaultState)
};

