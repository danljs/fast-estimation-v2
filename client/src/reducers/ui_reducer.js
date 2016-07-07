'use strict'
import { INITIAL, ADD, REMOVE, PRINT, SELECT, INPUT, DOWNLOAD} from '../actions/index'

const initialState = {
  category: [],
  rows: []
}
export default (state = initialState, action) => {
  let new_state = {}

  switch (action.type) {
    case INITIAL:
      return {
        category: action.category,
        rows: [new_row(action.category.length)]
      }

    case ADD:
      new_state = Object.assign({}, state)
      new_state.rows.push(new_row(state.category.length))
      return new_state

    case REMOVE:
      new_state = Object.assign({}, state)
      new_state.rows.splice(action.row_num, 1)
      return new_state

    case SELECT:
      new_state = Object.assign({}, state)
      new_state.rows[action.row_num].items[action.col_num] = action.value
      new_state.rows[action.row_num].amount = update_row(new_state.rows[action.row_num])
      
      return new_state

    case INPUT:
      new_state = Object.assign({}, state)
      new_state.rows[action.row_num].quatity = action.value
      new_state.rows[action.row_num].amount = update_row(new_state.rows[action.row_num])
      return new_state

    case DOWNLOAD:
      let url = window.URL.createObjectURL(new Blob([
        new Uint8Array(action.data)
        ],{type: "application/octet-stream"}));

      let b = document.createElement('a')
      b.href = url
      b.download = 'testtest.pdf'
      b.style.display = 'none'
      document.body.appendChild(b)
      b.click()
      document.body.removeChild(b)
      window.URL.revokeObjectURL(url);
    default:
      return state
  }
}

let new_row = length => {
  return { 
    items: Array.apply(null,{length: length}).map(() => ({price : 0, item_name : ''})),
    quatity: 1,
    amount: 0
  }
}

let update_row = row => 
  parseFloat(Math.round(row.quatity * row.items
            .map((c,i)=>!!!c.price ? 0 : parseFloat(c.price))
            .reduce((p,c)=>p + c, 0) * 100) / 100).toFixed(2)

let update_sum = rows => 
  parseFloat(Math.round(rows
            .map((c,i)=>!!!c.amount ? 0 : parseFloat(c.amount))
            .reduce((p,c) => p + c, 0) * 100) / 100).toFixed(2)

