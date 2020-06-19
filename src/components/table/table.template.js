const CODES = {
  'A': 65,
  'Z': 90
}

function toCell(row) {
  return function(_, col) {
    return `<div class="cell" contenteditable
      data-type="cell"
      data-col="${col}"
      data-id="${row}:${col}"
    ></div>`
  }
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(indexOfRow, content) {
  const resizer = indexOfRow
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${indexOfRow ? indexOfRow : ''}
        ${resizer}
      </div>

      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // compute cols count
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      // передаем референс вместо .map(el => createCol(el))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row)) // use closure on row. return function from toCell
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
