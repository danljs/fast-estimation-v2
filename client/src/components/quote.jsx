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

  componentDidMount(){
    // let xmlhttp = new XMLHttpRequest()
    // xmlhttp.onreadystatechange = ()=>{
    //   if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    //     this.setState({category: JSON.parse(xmlhttp.response).category})
    //   }
    // }
    // xmlhttp.open('GET', 'data/data.json', true)
    // xmlhttp.send()
    
  }

  componentWillReceiveProps(nextProps){
    // switch(nextProps.ws.type){
    //   case 'json-response':
    //     let category = nextProps.ws.data.category
    //     this.setState({
    //       category: category,
    //       rows: [this.new_row(category.length)]
    //     })
    //     break
    //   case 'print-response':
    //     let url = window.URL.createObjectURL(new Blob([
    //       new Uint8Array(nextProps.ws.file.data)
    //       ],{type: "application/octet-stream"}));

    //     let b = document.createElement('a')
    //     b.href = url
    //     b.download = 'testtest.pdf'
    //     b.style.display = 'none'
    //     document.body.appendChild(b)
    //     b.click()
    //     document.body.removeChild(b)
    //     window.URL.revokeObjectURL(url);
    //     break
    //   default:
    // }
  }

  new_row(length){
    return { 
      items: Array.apply(null,{length: length}).map(() => ({price : 0, item_name : ''})),
      quatity: 1,
      amount: 0
    }
  }

  render() {
    let lang = this.props.lang.keys
    let titles = this.state.category.map((c,i)=>c[lang.item_name])
    
    let rows = this.props.ui.rows||[]
    let category = this.props.ui.category
    return (
      <div className='quote'>
        <div></div>
        <div className='row header'>
          <div className='add' onClick={e=>{
            this.setState({
              rows: [...rows, this.new_row(this.state.category.length)]
            })
            this.props.dispatch(add())
          }}/>
          <input className='new-todo' placeholder={lang.what}/>
          {/*
          <button onClick={e=>{
            var xhr = new XMLHttpRequest()
            xhr.responseType = 'blob'
            xhr.onload = () => {
              if (xhr.readyState !== 4 || xhr.status !== 200) return
              var a = document.createElement('a')
              a.href = window.URL.createObjectURL(xhr.response)
              a.download = 'testtest.pdf'
              a.style.display = 'none'
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            }
            xhr.onerror = (evt) => console.log(evt)
            xhr.onabort = (evt) => console.log(evt)
            xhr.open('GET', 'pdf')
            xhr.send()
          }}>test</button>
          */}
          <div className='print' onClick={e=>{
            console.log(rows)
            let a = rows.filter(c => c.items.filter(d=>d.item_name === '').length === 0)
            console.log(a.length)

            // debugger
            // this.props.dispatch(post_message({type:'print-request',data:'print'}))
          }}/>
        </div>
        <section className='main'><ul>
          <li className='row title'>
          { 
            titles.map((c,i)=><div key={i} className={'item' + i}>{c}</div>)
          }
          <div className='quatity'>{lang.quatity}</div>
          <div className='amount'>{lang.amount}</div>
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
          <div>{lang.summary}:</div>
        </div>
      </div>
    )
  }
}
export default connect(any => any)(quote)