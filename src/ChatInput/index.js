'use strict';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class ChatInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="chat-input" styles={styles.chatInput}>
        <input type="text" style={this.props.inputStyles || styles.inputStyle} placeholder={this.props.inputPlaceholder || 'Message'}></input>
      </div>
    )
  }
}

const styles = {
  chatInput: {
    flex: 1
  },
  inputStyle: {
    border: 'none',
    borderTopWidth: '1',
    borderTopStyle: 'solid',
    borderTopColor: '#ddd',
    fontSize: '16',
    outline: 'none',
    padding: '30',
    width: '100%'
  }
}
