'use strict';

import React, { Component } from 'react'

const styles = {
  chatbubble: {
    backgroundColor: "#03b4f4",
    borderRadius: 20,
    clear: 'both',
    marginTop: 1,
    marginRight: 'auto',
    marginBottom: 1,
    marginLeft: 'auto',
    maxWidth: 425,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    width: '-webkit-fit-content'
  },
  chatbubbleOrientationNormal: {
    float: 'right'
  },
  recipientChatbubble : {
    backgroundColor: '#ccc'
  },
  recipientChatbubbleOrientationNormal: {
    float: 'left'
  },
  p: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    margin: 0,
  }
}

export default class ChatBubble extends Component {
  constructor(props) {
    super()
    this.state = {
      message: undefined,
      bubbleStyles: {
        text: {},
        chatbubble: {},
        userBubble: {}
      },
    }
  }

  componentDidMount() {
    this.setState({
      message: this.props.message,
      bubbleStyles: this.props.bubbleStyles?
        {
          text: this.props.bubbleStyles.text?this.props.bubbleStyles.text:{},
          chatbubble: this.props.bubbleStyles.chatbubble?this.props.bubbleStyles.chatbubble:{},
          userBubble: this.props.bubbleStyles.userBubble?this.props.bubbleStyles.userBubble:{}
        }
        : {text:{},chatbubble:{}}
    })
  }

  // IPR
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

  // IPR
  _parse_for_links(message) {
    var i, j, str, last;
    if (message.search(/<a href=/) !== -1 && (i = message.search(/<a href=/)) && (j = message.search(/a>/))) {
      last = message.slice(j+5, -1)
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
    if (this.props.message.id) {
        return (
          <div style={Object.assign({},
            styles.chatbubble,
            styles.recipientChatbubble,
            (this.props.bubblesCentered?{}:styles.recipientChatbubbleOrientationNormal),
            this.state.bubbleStyles.chatbubble
          )}>
            <p style={Object.assign({},styles.p, this.state.bubbleStyles.text)}>{this.props.message.message}</p>
          </div>
        )
    } else {
      return (
        <div style={Object.assign({},
          styles.chatbubble,
          (this.props.bubblesCentered?{}:styles.chatbubbleOrientationNormal),
          this.state.bubbleStyles.chatbubble,
          this.state.bubbleStyles.userBubble
        )}>
          <p style={Object.assign({},styles.p, this.state.bubbleStyles.text)}>{this.props.message.message}</p>
        </div>
      )
    }
  }
}
