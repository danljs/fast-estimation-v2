'use strict'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class report extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
        before_c: '',
        before_e: '',
        after_c: '',
        after_e: '',
        company_c: '',
        company_e: '',
        subject_c: '',
        subject_e: ''
      }
  }
  componentWillMount(){
    this.handle_load(this.props)
  }
  // componentDidMount(){
  // }
  // componentWillUpdate(nextProps, nextState){
  // }
  // componentDidUpdate(prevProps, prevState){
  // }
  componentWillReceiveProps(nextProps) {
    this.handle_load(nextProps)
  }

  handle_load(props){
    const contract = props.ui.config.contract
    if(!!!contract) return
    
    this.setState({
      company_c: contract.item_name_c.company,
      subject_c: contract.item_name_c.subject,
      before_c: contract.item_name_c.before,
      after_c: contract.item_name_c.after,
      company_e: contract.item_name_e.company,
      subject_e: contract.item_name_e.subject,
      before_e: contract.item_name_e.before,
      after_e: contract.item_name_e.after
    })
  }
  render() {
    const actions = this.props.actions
    return (
      <div className='report'>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="input-company-c" className="col-sm-2 control-label">公司名称</label>
            <div className="col-sm-5">
              <input type="input" className="form-control" id="input-company-c" placeholder='公司名称中文' value={this.state.company_c||''}
              onChange={e => this.setState({company_c : e.target.value})}/>
            </div>
            <div className="col-sm-5">
              <input type="input" className="form-control" id="input-company-e" placeholder='公司名称英文' value={this.state.company_e||''}
              onChange={e => this.setState({company_e : e.target.value})}/>
            </div>
          </div>
          <hr/>

          <div className="form-group">
            <label htmlFor="input-subject-c" className="col-sm-2 control-label">报表抬头</label>
            <div className="col-sm-5">
              <input type="input" className="form-control" id="input-subject-c" placeholder='报表抬头中文' value={this.state.subject_c||''}
              onChange={e => this.setState({subject_c : e.target.value})}/>
            </div>
            <div className="col-sm-5">
              <input type="input" className="form-control" id="input-subject-e" placeholder='报表抬头英文' value={this.state.subject_e||''}
              onChange={e => this.setState({subject_e : e.target.value})}/>
            </div>
          </div>
          <hr/>

          <div className="form-group">
            <label htmlFor="input-before-c" className="col-sm-2 control-label">表前</label>
            <div className="col-sm-5">
              <textarea className="form-control" rows='4' id="input-before-c" placeholder='表前中文' value={this.state.before_c||''}
              onChange={e => this.setState({before_c : e.target.value})}/>
            </div>
            <div className="col-sm-5">
              <textarea className="form-control" rows='4' id="input-before-e" placeholder='表前英文' value={this.state.before_e||''}
              onChange={e => this.setState({before_e : e.target.value})}/>
            </div>
          </div>
          <hr/>

          <div className="form-group">
            <label htmlFor="input-after-c" className="col-sm-2 control-label">表后</label>
            <div className="col-sm-5">
              <textarea className="form-control" rows='4' id="input-after-c" placeholder='表后中文' value={this.state.after_c||''}
              onChange={e => this.setState({after_c : e.target.value})}/>
            </div>
            <div className="col-sm-5">
              <textarea className="form-control" rows='4' id="input-after-e" placeholder='表后英文' value={this.state.after_e||''}
              onChange={e => this.setState({after_e : e.target.value})}/>
            </div>
          </div>
          <hr/>
          
          <div className="form-group">
            <div className="col-sm-2"/>
            <div className="col-sm-2">
              <a className="btn btn-default" onClick={e=>actions.update_report({
                item_name_c:{
                  company: this.state.company_c,
                  subject: this.state.subject_c,
                  before: this.state.before_c,
                  after: this.state.after_c
                },
                item_name_e:{
                  company: this.state.company_e,
                  subject: this.state.subject_e,
                  before: this.state.before_e,
                  after: this.state.after_e
                }
              })}>临时保存</a>
            </div>
             <div className="col-sm-2">
              <a className="btn btn-default" onClick={e=>actions.save()}>永久保存</a>
            </div>
          </div>
        </form>
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
)(report)