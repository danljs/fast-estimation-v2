'use strict'
import { combineReducers } from 'redux'
import lang_reducer from './lang_reducer'
import ui_reducer from './ui_reducer'
import session_reducer from './session_reducer'

let last_action = (state=null,action) => action

const rootReducer = combineReducers({
	last_action: last_action,
  ui: ui_reducer,
	lang: lang_reducer,
  session: session_reducer
})

export default rootReducer 