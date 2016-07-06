'use strict'
import { RECEIVE_MESSAGE, CONNECTED} from '../actions/index'

let new_row = length => {
  return { 
    items: Array.apply(null,{length: length}).map(() => ({price : 0, item_name : ''})),
    quatity: 1,
    amount: 0
  }
}
const initialState = {
}
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      // debugger
      // return action.message
      switch(action.message.type){
        case 'json-response':
          let category = action.message.data.category
          return {
            category: category,
            rows: [new_row(category.length)]
          }
        case 'print-response':
          let url = window.URL.createObjectURL(new Blob([
            new Uint8Array(action.message.file.data)
            ],{type: "application/octet-stream"}));

          let b = document.createElement('a')
          b.href = url
          b.download = 'testtest.pdf'
          b.style.display = 'none'
          document.body.appendChild(b)
          b.click()
          document.body.removeChild(b)
          window.URL.revokeObjectURL(url);
          break
        default:
      }
    default:
      return {}
  }
}