'use strict'
import { INITIAL, ADD, REMOVE, PRINT, SELECT, INPUT, DOWNLOAD, UPDATE} from '../actions/index'

const initialState = {
  config: {
    category: []
  },
  rows: [],
  summary: 0
}
export default (state = initialState, action) => {
  let new_state = {}

  switch (action.type) {
    case INITIAL:
      return {
        config: action.config,
        rows: [new_row(action.config.category.length)],
        summary: 0
      }

    case ADD:
      new_state = Object.assign({}, state)
      new_state.rows.push(new_row(state.config.category.length))
      return new_state

    case REMOVE:
      new_state = Object.assign({}, state)
      new_state.rows.splice(action.row_num, 1)
      new_state.summary = update_sum(new_state.rows)
      return new_state

    case SELECT:
      new_state = Object.assign({}, state)
      new_state.rows[action.row_num].items[action.col_num] = action.value
      new_state.rows[action.row_num].amount = update_row(new_state.rows[action.row_num])
      new_state.summary = update_sum(new_state.rows)
      return new_state

    case INPUT:
      new_state = Object.assign({}, state)
      new_state.rows[action.row_num].quatity = action.value
      new_state.rows[action.row_num].amount = update_row(new_state.rows[action.row_num])
      new_state.summary = update_sum(new_state.rows)
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
      return state
    case UPDATE:
      new_state = Object.assign({}, state)
      let item = {}
      switch (action.value.path.length) {
        case 1:
          item = new_state.config.category[action.value.path[0]] 
          break
        case 2:
          item = new_state.config.category[action.value.path[0]].sub[action.value.path[1]] 
          break
        case 3:
          item = new_state.config.category[action.value.path[0]].sub[action.value.path[1]].sub[action.value.path[2]]
          break
        default:
      }
      item.item_name_e = action.value.item_name_e
      item.item_name_c = action.value.item_name_c
      item.price = action.value.price
      return new_state
    default:
      return state
  }
}

let new_row = length => ({
    items: Array.apply(null,{length: length}).map(() => ({})),
    quatity: 1,
    amount: 0
})

let update_row = row => 
  parseFloat(Math.round(row.quatity * row.items
            .map((c,i)=>!!!c.price ? 0 : parseFloat(c.price))
            .reduce((p,c)=>p + c, 0) * 100) / 100).toFixed(2)

let update_sum = rows => 
  parseFloat(Math.round(rows
            .map((c,i)=>!!!c.amount ? 0 : parseFloat(c.amount))
            .reduce((p,c) => p + c, 0) * 100) / 100).toFixed(2)

