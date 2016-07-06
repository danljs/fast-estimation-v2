'use strict'
import {CONNECTING, CONNECTED} from '../actions/index'

const initialState = {
  connecting: false,
  connected: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECTING:
      return {connecting: true, connected: false}
    case CONNECTED:
      return {connecting: false, connected: true}
    default:
      return state
  }
}