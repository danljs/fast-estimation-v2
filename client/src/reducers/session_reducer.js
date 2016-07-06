'use strict'
import {CONNECTED} from '../actions/index'

const initialState = {
  connected: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECTED:
      return {connected: true}
    default:
      return state
  }
}