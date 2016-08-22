'use strict';

import React, { Component } from 'react'

export default class ChatBubble extends Component {
  constructor(props) {
    super()
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    //this._parse_for_links(this.props.children)
    this.setState({message: this.props.children})
  }

  _parse_for_styles(message) {
    if (typeof(message) === "string") {
      var bolded_start = message.search(/__(\w+\s?)+__/);
      var bolded_end = message.slice(bolded_start+2).search(/__/)
      var bolded = message.slice(bolded_start + 2, bolded_start + bolded_end + 2)
      // Render text
      if (bolded_start != -1 && bolded_end != -1) {
        return (
          <span>
            {this._parse_for_styles(message.slice(0, bolded_start))}
            <strong>{bolded}</strong>
            {this._parse_for_styles(message.slice(bolded_start + bolded_end + 4))}
          </span>
        )
      }
      else {
        return <span>{message}</span>
      }
    }
    return message
  }

  _parse_for_links(message) {
    var i, j, str, last;
    if (message.search(/<a href=/) !== -1 && (i = message.search(/<a href=/)) && (j = message.search(/a>/))) {
      last = message.slice(j+5, -1)
      console.log(last);
      return (<p>
        {message.slice(0, i)}
        <a target="_blank"
          href={message.slice(i+9, message.search(/'>|">/))}>
          {message.slice(message.search(/'>|">/)+2, j-2)}
        </a>
        {message.slice(j+2)}</p>
      )
    }
    else {
      return <p>{message}</p>
    }
  }

  render() {
    return (
      <div className="chatbubble">
        <p>{this._parse_for_styles(this.state.message)}</p>
      </div>
    )
  }
}
