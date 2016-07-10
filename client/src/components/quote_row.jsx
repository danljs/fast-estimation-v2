'use strict'
import React from 'react'
import { connect } from 'react-redux'
import QuoteCell from './quote_cell'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'

class quote_row extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { ui, row_num, actions } = this.props
    return (
      <li className='row'>
      {
        ui.category.map((c,i)=>
          <div key={i} className={'item' + i}>
            <QuoteCell subs={c.sub} row_num={row_num} col_num={i}/>
          </div>
        )
      }
      <div className='quatity'>
        <input type='number' step='1' min='1' max='99' value={ui.rows[row_num].quatity} 
          onChange={e => actions.input(row_num, e.target.value)}/>
      </div>
      <div className='amount'>{ui.rows[row_num].amount}</div>
      <div className='delete' onClick={e => actions.remove(row_num)}/>
      </li>
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
)(quote_row)