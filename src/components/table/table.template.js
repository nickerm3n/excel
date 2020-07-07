const CODES = {
  A: 65,
  Z: 90,
};

function toColumn(col) {
  return `<div class="column">${col}</div>`;
}

function toCell() {
  return `<div class="cell" contenteditable="true"></div>`;
}

function createRow(content, index = "") {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
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
