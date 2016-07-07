'use strict'
import React from 'react'
import { connect } from 'react-redux'
import QuoteCell from './quote_cell'
import {remove, input} from '../actions/index'

class quote_row extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { dispatch, ui, row_num } = this.props
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
          onChange={e => dispatch(input(row_num, e.target.value))}/>
      </div>
      <div className='amount'>{ui.rows[row_num].amount}</div>
      <div className='delete' onClick={e => dispatch(remove(row_num))}/>
      </li>
    )
  }
}
export default connect(state => ({ui: state.ui}))(quote_row)