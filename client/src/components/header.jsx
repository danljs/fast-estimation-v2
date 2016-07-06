'use strict'
import React from 'react'
import { connect } from 'react-redux'
import {change_lang} from '../actions/index'

class header extends React.Component{
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps){

  }
  render() {
    const { dispatch, lang } = this.props
    return (
      <div className='header-area'>
      {/*
        <a onClick={e=>{
        }}>{lang.logout}</a>
        <a onClick={e=>{
          this.context.router.push('/admin')
        }}>{lang.admin}</a>
        <a onClick={e=>{
          this.context.router.push('/quote')
        }}>{lang.quote}</a>
      */}
        <a onClick={e=>{
          dispatch(change_lang(lang.change_id))
        }}>{lang.name}</a>
      </div>
    )
  }
}

export default connect(state => ({lang: state.lang}))(header)