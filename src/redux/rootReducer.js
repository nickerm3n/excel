import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TABLE_NAME,
  CHANGE_TEXT,
  TABLE_RESIZE,
} from "@/redux/types";

export function rootReducer(state, action) {
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type + 'State';
      return {...state, [field]: value(state, field, action)};
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        dataState: value(state, field, action),
      };
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data};
    case APPLY_STYLE:
      field = 'stylesState';
      const val = state[field] || {};
      action.data.ids.forEach((id) => {
        // val[id] = toInlineStyles(action.data.value);
        val[id] = {...val[id], ...action.data.value}
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}};
    case CHANGE_TABLE_NAME:
      return {...state, tableName: action.data};
    default: return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
