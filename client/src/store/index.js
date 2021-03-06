import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import {
  connecting,
  connected,
  receive_message,
  post_message,
  POST_MESSAGE,
  initial
} from '../actions/index'

export default (()=>{
  let websocket
  const store = createStore(rootReducer, {}, applyMiddleware(thunk))
  store.subscribe(() => {
    const { session, last_action } = store.getState()
    switch (last_action.type) {
    case POST_MESSAGE:
      let message = JSON.stringify(last_action.message)
      !!!websocket || websocket.readyState === websocket.CLOSED ? open(false, message) : websocket.send(message)
    default:
      return
    }
  })

  let open = (first, message) => {
    store.dispatch(connecting())
    websocket = new WebSocket(`ws${!!!module.hot ? 's' : ''}${'://' + window.location.hostname}:8443`)
    websocket.onmessage = event => store.dispatch(receive_message(JSON.parse(event.data)))
    websocket.onopen = () => {
      store.dispatch(connected())
      first ? store.dispatch(post_message({type:'json-request',data:'initial'})) : websocket.send(message)
    }
    websocket.onclose = () => console.log('websocket.onclose')
    websocket.onerror = () => console.log('websocket.onerror')
  }

  !!websocket && websocket.readyState === websocket.OPEN ? websocket.close() : ''
  open(true)

  return store
}())
