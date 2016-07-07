'use strict'
export const CHANGE_LANG = 'CHANGE_LANG'

export const POST_MESSAGE = 'POST_MESSAGE'

export const CONNECTING = 'CONNECTING'
export const CONNECTED =  'CONNECTED'
export const ERROR =  'ERROR'

export const INITIAL = 'INITIAL'
export const ADD = 'ADD'
export const REMOVE = 'REMOVE'

export const PRINT = 'PRINT'
export const DOWNLOAD = 'DOWNLOAD'

export const SELECT = 'SELECT'
export const INPUT = 'INPUT'

export let change_lang = lang => ({type: CHANGE_LANG, lang})
export let connecting = () => ({type: CONNECTING})
export let connected = () => ({type: CONNECTED})
export let error = (message) => ({type: ERROR,message})
export let post_message = (message) => ({type: POST_MESSAGE,message})
export let receive_message = (message) => (dispatch, getState) => {
  switch(message.type){
    case 'json-response':
      return dispatch(initial(message.data.category))
    case 'print-response':
      return dispatch(download(message.file.data))
    default:
  }
}

export let initial = category => ({type: INITIAL, category})
export let add = () => ({type: ADD})
export let remove = (row_num) => ({type: REMOVE, row_num})
export let print = data => (dispatch, getState) => dispatch(post_message({type:'print-request',data:data}))
export let download = data => ({type: DOWNLOAD, data})
export let select = (row_num, col_num, value) => ({type: SELECT, row_num, col_num, value})
export let input = (row_num, value) => ({type: INPUT, row_num, value})
