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
    width: '100%',
    border: '2px solid #ccc',
    borderRadius: '6px',
    padding: '10px',
    fontSize: '16px',
    alignSelf: 'flex-end'
  }
}
