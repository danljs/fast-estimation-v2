'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import {withRouter} from 'react-router'

class header extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selected : 0
    }
  }
  componentWillReceiveProps(nextProps){

  }
  render() {
    const { lang, actions, router } = this.props
    const menus = [
      {link: '/quote', title: lang.quote, index: 0},
      {link: '/report', title: lang.report, index: 1},
      {link: '/admin', title: lang.admin, index: 2}
    ]
    return (
      <div className='header-area'><div>
        {
          menus.map((c,i) => <a key={i} onClick={e => {
            router.push(c.link)
            this.setState({selected : i})
          }} className={this.state.selected === c.index ? 'selected':''}>{c.title}</a>)
        }
        <a onClick={e => actions.change_lang(lang.change_id)}>{lang.name}</a>
      </div></div>
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