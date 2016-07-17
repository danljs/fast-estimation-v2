'use strict'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QuoteRow from './quote_row'
import * as Actions from '../actions'

class quote extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {ui, lang, actions} = this.props
    return (
      <div className='quote'>
        <div></div>
        <div className='row header'>
          <div className='add' onClick={e => actions.add()}/>
          <input className='new-todo' placeholder={lang.what}/>
          <div className='print' onClick={e => actions.print()}/>
        </div>
        <section className='main'><ul>
          <li className='row title'>
          {
            ui.config.category.map((c,i)=><div key={i} className={'item' + i}>{c[lang.item_name]}</div>)
          }
          <div className='quatity'>{lang.quatity}</div>
          <div className='amount'>{lang.amount}</div>
          </li>
          {
            ui.rows.map((c,i) => <QuoteRow key={i} row_num={i}/>)
          }
        </ul></section>
        <div className='footer'>
          <div>{ui.summary}</div>
          <div>{lang.summary}:</div>
        </div>
      </div>
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
)(quote)

// export default connect(state => ({lang: state.lang, ui: state.ui}))(quote)

// some test code 
// componentDidMount(){
  // let xmlhttp = new XMLHttpRequest()
  // xmlhttp.onreadystatechange = ()=>{
  //   if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
  //     this.setState({category: JSON.parse(xmlhttp.response).category})
  //   }
  // }
  // xmlhttp.open('GET', 'data/data.json', true)
  // xmlhttp.send()
  
// }

// <button onClick={e=>{
//   var xhr = new XMLHttpRequest()
//   xhr.responseType = 'blob'
//   xhr.onload = () => {
//     if (xhr.readyState !== 4 || xhr.status !== 200) return
//     var a = document.createElement('a')
//     a.href = window.URL.createObjectURL(xhr.response)
//     a.download = 'testtest.pdf'
//     a.style.display = 'none'
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//   }
//   xhr.onerror = (evt) => console.log(evt)
//   xhr.onabort = (evt) => console.log(evt)
//   xhr.open('GET', 'pdf')
//   xhr.send()
// }}>test</button>
