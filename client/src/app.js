'use strict'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router'
import { createHashHistory } from 'history'

import Header from './components/header'
import quote from './components/quote'
import store from './store'

class app extends React.Component{
	render() {
		return (
      <div><Header/>
        <div>
          {this.props.children}
        </div>
      </div>
      )
	}
}

render(
    <Provider store={store}>
      <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
        <Route path="/" component={app}>
          <IndexRoute component={quote} />
          <Route path="quote" component={quote}/>
        </Route>
      </Router>
    </Provider>,
  document.getElementById('app')
)
