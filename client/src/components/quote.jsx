'use strict'
import React from 'react'
import { connect } from 'react-redux'
import QuoteRow from './quote_row'
import {post_message, add} from '../actions/index'

class quote extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      category: [],
      summary: 0.00
    }
  }

  render() {
    const { dispatch, ui, lang } = this.props
    let lang_keys = lang.keys
    let rows = ui.rows||[]
    let category = ui.category
    let titles = category.map((c,i)=>c[lang_keys.item_name])
    return (
      <div className='quote'>
        <div></div>
        <div className='row header'>
          <div className='add' onClick={e => dispatch(add())}/>
          <input className='new-todo' placeholder={lang_keys.what}/>
          <div className='print' onClick={e => dispatch(post_message({type:'print-request',data:'print'}))}/>
        </div>
        <section className='main'><ul>
          <li className='row title'>
          {
            titles.map((c,i)=><div key={i} className={'item' + i}>{c}</div>)
          }
          <div className='quatity'>{lang_keys.quatity}</div>
          <div className='amount'>{lang_keys.amount}</div>
          </li>
          {
            rows.map((c,i)=>
              <QuoteRow key={i} 
                value={c}
                category={category} 
                onChange={value=>{
                  rows[i] = value
                  this.setState({rows: rows})
                }}
                remove={e=>{
                  rows.splice(i,1)
                  this.setState({rows: rows})
                }}
              />
            )
          }
        </ul></section>
        <div className='footer'>
          <div>{
            parseFloat(Math.round(rows
            .map((c,i)=>!!!c.amount ? 0 : parseFloat(c.amount))
            .reduce((p,c) => p + c, 0) * 100) / 100).toFixed(2)
          }</div>
          <div>{lang_keys.summary}:</div>
        </div>
      </div>
    )
  }
}
export default connect(any => any)(quote)

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
