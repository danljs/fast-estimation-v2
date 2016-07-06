'use strict'
import { CHECK, CHECKTED, INITIAL, ADD, REMOVE, PRINT} from '../actions/index'

const initialState = {
  rows: [],
  checked: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK:
      return {type: 'check'}
    case CHECKTED:
      return {type: 'checked'}
    case INITIAL:
      return {
        category: action.category,
        rows: [new_row(action.category.length)]
      }
    case ADD:
      let a = Object.assign({}, state)
      a.rows.push(new_row(a.category.length))
      return a
    case REMOVE:
      return {type: 'checked'}
    case PRINT:
      return {type: 'checked'}
    default:
      return {}
  }
}

let new_row = length => {
  return { 
    items: Array.apply(null,{length: length}).map(() => ({price : 0, item_name : ''})),
    quatity: 1,
    amount: 0
  }
}