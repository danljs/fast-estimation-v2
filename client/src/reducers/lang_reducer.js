'use strict'
import { CHANGE_LANG} from '../actions/index'
import ch from '../lang/ch'
import en from '../lang/en'
const langs = {
	ch: ch,
	en: en
}

const initialState = langs[localStorage.getItem('langs') || 'en']

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANG:
    	localStorage.setItem('langs', action.lang)
      return langs[action.lang]
    default:
      return state
  }
}