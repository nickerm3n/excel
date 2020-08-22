import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TABLE_NAME,
  CHANGE_TEXT,
  TABLE_RESIZE,
} from "@/redux/types";

export const tableResize = (data) => {
  return {
    type: TABLE_RESIZE,
    data,
  }
};

export const changeText = (data) => {
  return {
    type: CHANGE_TEXT,
    data,
  }
};

export const changeTableName = (data) => {
  return {
    type: CHANGE_TABLE_NAME,
    data,
  }
};

export const changeStyles = (data) => {
  return {
    type: CHANGE_STYLES,
    data,
  }
};

export const applyStyles = (data) => {
  return {
    type: APPLY_STYLE,
    data,
  }
};
