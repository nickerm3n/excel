import {storage} from "@core/utils";
import {defaultStyles} from "@/constants";

const defaultState = {
  tableName: "Новая таблица",
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: "",
  currentStyles: defaultStyles,
};

const normalize = (state) => {
  return {
    ...state,
    currentText: "",
    currentStyles: defaultStyles,
  }
};

export const initialState = storage('excel-state') ?
  normalize(storage('excel-state')) :
  defaultState;

