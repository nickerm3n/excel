const CODES = {
  A: 65,
  Z: 90,
};

function toColumn(col, index) {
  return `
    <div class="column" data-col=${index} data-type="resizable">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(_, index) {
  return `
    <div class="cell" contenteditable="true" data-col=${index}></div>
  `;
}

function createRow(content, index = "") {
  const resizer = index ?
    `<div class="row-resize" data-resize="row"></div>` :
    ""

  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill(null)
    .map(toChar)
    .map(toColumn)
    .join("");

  rows.push(createRow(cols));

  const cells = new Array(colsCount).fill(null).map(toCell).join("");

  new Array(rowsCount)
    .fill(null)
    .forEach((_, index) => rows.push(createRow(cells, index + 1)));

  return rows.join("");
}
