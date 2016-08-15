'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import {withRouter, browserHistory} from 'react-router'

class header extends React.Component{
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps){

  }
  render() {
    const { lang, actions, router } = this.props
    return (
      <div className='header-area'>
        <a onClick={e => actions.change_lang(lang.change_id)}>{lang.name}</a>
        <a onClick={e => router.push('/report')}>{lang.report}</a>
        <a onClick={e => router.push('/admin')}>{lang.admin}</a>
        <a onClick={e => router.push('/quote')}>{lang.quote}</a>
      </div>
    )
  }
}
let mapStateToProps = state =>({
  lang: state.lang
})

let mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(header))