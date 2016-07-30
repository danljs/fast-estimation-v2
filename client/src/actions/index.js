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
  INPUT = 'INPUT',

  UPDATE = 'UPDATE',
  SAVE = 'SAVE',
  UPDATE_REPORT = 'UPDATE_REPORT'

export let change_lang = lang => ({type: CHANGE_LANG, lang})
export let connecting = () => ({type: CONNECTING})
export let connected = () => ({type: CONNECTED})
export let error = message => ({type: ERROR,message})
export let post_message = message => ({type: POST_MESSAGE,message})
export let receive_message = message => (dispatch, getState) => {
  switch(message.type){
    case 'json-response':
      return dispatch(initial(message.data))
    case 'print-response':
      return dispatch(download(message.file.data))
    default:
  }
}

export let initial = config => ({type: INITIAL, config})
export let add = () => ({type: ADD})
export let remove = row_num => ({type: REMOVE, row_num})
export let print = () => (dispatch, getState) => {
  let ui = getState().ui
  let lang = getState().lang
  if(ui.rows.filter(c => c.items.filter(d => !!!d.item_id).length > 0).length > 0){
    alert(lang['please_input'])
    return
  }

  dispatch(post_message({type:'print-request',data : {
    subject : '',
    before : '',
    after : '',
    title : [...ui.config.category.map(c => c[lang.item_name]), lang.quatity, lang.amount],
    body : ui.rows.map(c => [...c.items.map(d => d[lang.item_name]), c.quatity + '', c.amount]),
    summary: lang.summary + ':' + ui.summary
  }}))

}
export let download = data => ({type: DOWNLOAD, data})
export let select = (row_num, col_num, value) => ({type: SELECT, row_num, col_num, value})
export let input = (row_num, value) => ({type: INPUT, row_num, value})
export let update = (value) => ({type: UPDATE, value})
export let save = () => (dispatch, getState) => {
  dispatch(post_message({type:'save-request', data : getState().ui.config}))
}
export let update_report = (value) => ({type: UPDATE_REPORT, value})
