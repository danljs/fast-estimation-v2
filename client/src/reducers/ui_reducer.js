'use strict'
import { INITIAL, ADD, REMOVE, PRINT} from '../actions/index'

const initialState = {
  category: [],
  rows: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL:
      return {
        category: action.category,
        rows: [new_row(action.category.length)]
      }

    case ADD:
      let new_state = Object.assign({}, state)
      new_state.rows.push(new_row(state.category.length))
      return new_state

    case REMOVE:
      let _state = Object.assign({}, state)
      _state.rows.splice(action.row_num, 1)
      return _state

    case PRINT:
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