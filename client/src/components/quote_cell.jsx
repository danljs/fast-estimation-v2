'use strict'
import React from 'react'
import { connect } from 'react-redux'
import {select} from '../actions/index'

class quote_cell extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { dispatch, ui, lang, subs, row_num, col_num } = this.props
    let value = ui.rows[row_num].items[col_num]
    //multi-level select:
    //http://jsfiddle.net/chirayu45/yxkut/16/
    return (
      <select className={ !!!value.item_id ? 'error' : ''} value={JSON.stringify(value)} 
        onChange={ e => dispatch(select(row_num, col_num, JSON.parse(e.target.value)))}>
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
export default connect(state => ({lang: state.lang, ui: state.ui}))(quote_cell)