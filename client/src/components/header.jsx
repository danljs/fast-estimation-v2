'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'

class header extends React.Component{
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps){

  }
  render() {
    const { lang, actions } = this.props
    return (
      <div className='header-area'>
        <a onClick={e=>actions.change_lang(lang.change_id)}>{lang.name}</a>
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
)(header)