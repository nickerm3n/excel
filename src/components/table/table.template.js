import {toInlineStyles} from "@core/utils";
import {defaultStyles} from "@/constants";
import {parse} from "@core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const getWidth = (state = {}, index) => {
  return (state[index] || DEFAULT_WIDTH) + 'px';
};

const getHeight = (state = {}, index) => {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
};

function toColumn(colState) {
  return function(col, index) {
    const width = getWidth(colState, index);

    return `
    <div class="column" 
        data-col=${index} 
        data-type="resizable"
        style="width:${width}"
        >
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
  }
}

function toCell(row, state) {
  return function(_, col) {
    const width = getWidth(state.colState, col);
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
        <div 
            class="cell"
            contenteditable="true"
            data-col=${col}
            data-type="cell"
            data-value="${data || ""}"
            data-id="${id}"
            style="${styles}; width: ${width}"
        >${parse(data) || ""}</div>
    `;
  }
}

function createRow(content, index = "", state = {}) {
  const height = getHeight(state, index);
  const resizer = index ?
    `<div class="row-resize" data-resize="row"></div>` :
    ""

  return `
    <div 
    class="row" 
    data-type="resizable" 
    data-row="${index}" 
    style="height:${height}">
      <div class="row-info" >
        ${index}
        ${resizer}
       </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(state, rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill(null)
    .map(toChar)
    .map(toColumn(state.colState))
    .join("");

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill(null)
      .map(toCell(row, state)).join("");
    rows.push(createRow(cells, row + 1, state.rowState))
  }

  return rows.join("");
}
