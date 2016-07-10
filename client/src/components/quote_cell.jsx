'use strict'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'

class quote_cell extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { ui, lang, subs, row_num, col_num, actions } = this.props
    let value = ui.rows[row_num].items[col_num]
    //multi-level select:
    //http://jsfiddle.net/chirayu45/yxkut/16/
    return (
      <select className={ !!!value.item_id ? 'error' : ''} value={JSON.stringify(value)} 
        onChange={ e => actions.select(row_num, col_num, JSON.parse(e.target.value))}>
        <option value={JSON.stringify({})} disabled='disabled'></option>
        {
          subs.map((c,i)=>
            !!!c.sub ?
            <option key={i} value={JSON.stringify(c)}>{c[lang.item_name]}</option>
            :
            <optgroup key={i} label={c[lang.item_name]}>
              {c.sub.map((s,j)=><option key={j} value={JSON.stringify(s)}>{s[lang.item_name]}</option>)}
            </optgroup>
          )
        }
      </select>
    )
  }
}
let mapStateToProps = state =>({
  lang: state.lang,
  ui: state.ui
})

let mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(quote_cell)