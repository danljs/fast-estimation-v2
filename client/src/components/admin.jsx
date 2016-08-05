'use strict'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import TreeView from 'react-treeview'

class admin extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
        item_name_e: '',
        item_name_c: '',
        price: '',
        path: '',
        price_valid: true
      }
  }

  render() {
    const {ui, lang, actions} = this.props
    return (
      <div className='admin'>
        <div className='tree-area'>
        {ui.config.category.map((node, i) => 
          <TreeView key={node.item_id + '|' + i} nodeLabel={<span className="node"
            onClick={e => this.setState({
              item_name_e : node.item_name_e, 
              item_name_c : node.item_name_c, 
              price : node.price,
              path : [i],
              price_valid : !!!node.sub
            })}>{node.item_id}</span>}>
            <div className="info">英文名称: {node.item_name_e}</div>
            <div className="info">中文名称: {node.item_name_c}</div>
            {node.sub.map((p, j) => 
                <TreeView nodeLabel={<span className="node" 
                  onClick={e => this.setState({
                    item_name_e : p.item_name_e, 
                    item_name_c : p.item_name_c, 
                    price : p.price,
                    path : [i, j],
                    price_valid : !!!p.sub
                  })}> {p.item_id}</span>} key={p.item_id} >
                  <div className="info">英文名称: {p.item_name_e}</div>
                  <div className="info">中文名称: {p.item_name_c}</div>
                  { 
                    !!!p.sub ? <div className="info">单价: {p.price}</div> :
                    p.sub.map((s, k) => 
                      <TreeView nodeLabel={<span className="node" 
                        onClick={e => this.setState({
                          item_name_e : s.item_name_e, 
                          item_name_c : s.item_name_c, 
                          price : s.price,
                          path : [i, j, k],
                          price_valid : true
                        })}> {s.item_id}</span>} key={s.item_id}> 
                        
                        <div className="info">英文名称: {s.item_name_e}</div>
                        <div className="info">中文名称: {s.item_name_c}</div>
                        <div className="info">单价: {s.price}</div>
                      </TreeView>
                    )
                  }
                </TreeView>
            )}
          </TreeView>
        )}
        </div>
        <div className='edit-area'>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="input-name-e" className="col-sm-3 control-label">英文名称</label>
              <div className="col-sm-9">
                <input ref="name-e" type="input" className="form-control" id="input-name-e" placeholder='英文名称' value={this.state.item_name_e}
                onChange={e => this.setState({item_name_e : e.target.value})}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="input-name-c" className="col-sm-3 control-label">中文名称</label>
              <div className="col-sm-9">
                <input ref="name-c" type="input" className="form-control" id="input-name-c" placeholder='中文名称' value={this.state.item_name_c}
                onChange={e => this.setState({item_name_c : e.target.value})}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="input-price" className="col-sm-3 control-label">价格</label>
              <div className="col-sm-9">
                <input ref="price" type="input" className="form-control" id="input-price" placeholder='价格' disabled={!this.state.price_valid} value={this.state.price||''}
                onChange={e => this.setState({price : e.target.value})}/>
              </div>
            </div>
            <hr/>
            
          {/*
            <div className="form-group">
              <label htmlFor="input-image" className="col-sm-4 control-label">图片</label>
              <div className="col-sm-8">
                <input ref="image" type="file" className="form-control" id="input-image"/>
              </div>
            </div>
          */}
            <div className="form-group">
              <div className="col-sm-3"/>
              <div className="col-sm-3">
                <a className="btn btn-default" onClick={e=>actions.update({
                  path: this.state.path,
                  item_name_c: this.state.item_name_c,
                  item_name_e: this.state.item_name_e,
                  price: this.state.price
                })}>临时保存</a>
              </div>

              <div className="col-sm-3">
                <a className="btn btn-default" onClick={e=>actions.save()}>永久保存</a>
              </div>
            </div>
          </form>
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
)(admin)