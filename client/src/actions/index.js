'use strict'
export const CHANGE_LANG = 'CHANGE_LANG'

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
export const POST_MESSAGE = 'POST_MESSAGE'

export const CONNECTING = 'CONNECTING'
export const CONNECTED =  'CONNECTED'
export const ERROR =  'ERROR'

export const CHECK =  'CHECK'
export const CHECKTED = 'CHECKTED'
export const INITIAL = 'INITIAL'
export const ADD = 'ADD'
export const REMOVE = 'REMOVE'
export const PRINT = 'PRINT'

export let change_lang = lang => {
  return {type: CHANGE_LANG, lang}
}
export let connecting = () => {
  return {type: CONNECTING}
}
export let connected = () => {
  return {type: CONNECTED}
}
export let error = (message) => {
  return {type: ERROR,message}
}
export let post_message = (message) => {
  return {type: POST_MESSAGE,message}
}
export let receive_message = (message) => {
  return (dispatch, getState) => {
    switch(message.type){
      case 'json-response':
        return dispatch(initial(message.data.category))
      case 'print-response':
        return dispatch(print(message.file.data))
      default:
    }
  }
  // return {type: RECEIVE_MESSAGE,message}
}

export let check = () => {
    return {type: CHECK}
}

export let checked = (status) => {
    return {type: CHECKTED, status}
}

export let initial = category => {
    return {type: INITIAL, category}
}
export let add = () => {
    return {type: ADD}
}
export let remove = () => {
    return {type: REMOVE}
}
export let print = data => {
    return {type: PRINT, data}
}
