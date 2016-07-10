'use strict'
export const 
  CHANGE_LANG = 'CHANGE_LANG',
  POST_MESSAGE = 'POST_MESSAGE',
  CONNECTING = 'CONNECTING',
  CONNECTED =  'CONNECTED',
  ERROR =  'ERROR',
  INITIAL = 'INITIAL',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  PRINT = 'PRINT',
  DOWNLOAD = 'DOWNLOAD',
  SELECT = 'SELECT',
  INPUT = 'INPUT'

export let change_lang = lang => ({type: CHANGE_LANG, lang})
export let connecting = () => ({type: CONNECTING})
export let connected = () => ({type: CONNECTED})
export let error = message => ({type: ERROR,message})
export let post_message = message => ({type: POST_MESSAGE,message})
export let receive_message = message => (dispatch, getState) => {
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
export let remove = row_num => ({type: REMOVE, row_num})
export let print = () => (dispatch, getState) => {
  getState().ui.rows.filter(c => c.items.filter(d => !!!d.item_id).length > 0).length > 0 ? 
  alert(getState().lang['please_input'])
  :
  dispatch(post_message({type:'print-request',data : getState().ui}))
}
export let download = data => ({type: DOWNLOAD, data})
export let select = (row_num, col_num, value) => ({type: SELECT, row_num, col_num, value})
export let input = (row_num, value) => ({type: INPUT, row_num, value})
