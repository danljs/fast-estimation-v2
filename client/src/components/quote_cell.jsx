'use strict'
import React from 'react'
import { connect } from 'react-redux'

class quote_cell extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      value : ''
    }
  }

  render() {
    const { dispatch, ui, lang, subs, row_num, col_num } = this.props
    let value = ui.rows[row_num].items[col_num].item_name
    // value = !!!value ?  '0:' : value.price + ':' + value.item_name
    //multi select:
    //http://jsfiddle.net/chirayu45/yxkut/16/
    // console.log(this.props.value)
    return (
      <select className={!!!value?'error':''} value={value} onChange={e=>{
        let value = e.target.value.split(':')
        this.setState({value : value})
        this.props.change({price : value[0], item_name : value[1]})
      }}>
        <option value='' disabled='disabled'></option>
        {
          subs.map((c,i)=>
            !!!c.sub ?
            <option key={i} value={c.price + ':' + c[lang.item_name]}>{c[lang.item_name]}</option>
            :
            <optgroup key={i} label={c[lang.item_name]}>
              {c.sub.map((s,j)=><option key={j} value={s.price + ':' + s[lang.item_name]}>{s[lang.item_name]}</option>)}
            </optgroup>
          )
        }
      </select>
    )
  }
}
export default connect(state => ({lang: state.lang, ui: state.ui}))(quote_cell)