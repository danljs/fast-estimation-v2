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
      }
  }

  render() {
    const {ui, lang, actions} = this.props
    return (
        <div className='admin'>
        <div className='tree-area'>
        {ui.category.map((node, i) => 
            <TreeView key={node.item_id + '|' + i} nodeLabel={<span className="node">{node.item_id}</span>} >
              {node.sub.map(person => 
                  <TreeView nodeLabel={<span className="node">{person.item_id}</span>} key={person.item_id} >
                    <div className="info">英文名称: {person.item_name_e}</div>
                    <div className="info">中文名称: {person.item_name_c}</div>
                    <div className="info">单价: {person.price}</div>
                  </TreeView>
              )}
            </TreeView>
        )}
      </div>
      <div className='edit-area'>
        <div className="info">英文名称: </div>
        <div className="info">中文名称: </div>
        <div className="info">单价: </div>
        <a>保存</a>
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