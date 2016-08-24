'use strict';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ChatBubble from './ChatBubble'

const styles = {

  chatbubbleWrapper: {
    overflow: 'auto'
  }

  recipient: {
    marginTop: 10,
    marginBottom: 10,
    position: 'relative'
  },

  img: {
    borderRadius: 100,
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: 36,
    zIndex: 100,
  }
}

export default class ChatFeed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
    console.log("Feed",this.props);
  }

  componentDidUpdate() {
    console.log('ChatFeed update');
  }

  _scrollToBottom() {
    console.log("scroll to bottom");
    const {chat} = this.refs;
    const scrollHeight = chat.scrollHeight;
    const height = chat.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(chat).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  // Determine whether to render a group of messages or a single message
  _renderGroup(messages, index) {
    var group = []

    for (var i = index; messages[i] ? messages[i].type : false; i--) {
      group.push(messages[i])
    }

    var message_nodes = group.reverse().map((curr, index) => {
      return <ChatBubble recipient={curr.type} bubbleStyles={this.props.bubbleStyles}>{curr.message}</ChatBubble>
    })
    return (
      <div key={Math.random().toString(36)} style={Object.assign(styles.recipient, styles.chatbubbleWrapper)}>
        {message_nodes}
      </div>
    )
  }

  // Render the message list as chat bubbles
  _renderMessages(messages) {
    var message_nodes = messages.map((curr, index) => {

      if (!(messages[index-1] ? messages[index-1].type : false) && curr.type && !(messages[index+1] ? messages[index+1].type : false)) {
        console.log("Single message");
        return (
          <div key={Math.random().toString(36)} style={Object.assign(styles.recipient, styles.chatbubbleWrapper)}>
            <ChatBubble recipient={1} bubbleStyles={this.props.bubbleStyles?this.props.bubbleStyles:{}}>{curr.message}</ChatBubble>
          </div>
        )
      }
      else if (curr.type && (messages[index-1] ? messages[index-1].type : false) && !(messages[index+1] ? messages[index+1].type : false)) {
        return this._renderGroup(messages, index)
      }

      else if (!curr.type) {
        return (
          <div key={Math.random().toString(36)} style={Object.assign(styles.recipient, styles.chatbubbleWrapper)}>
            <ChatBubble recipient={0} bubbleStyles={this.props.bubbleStyles?this.props.bubbleStyles:{}}>
              {curr.message}
            </ChatBubble>
          </div>
        )
      }

    })
    if (this.props.is_typing) {
      message_nodes.push(
        <div key={Math.random().toString(36)} style={Object.assign(styles.recipient, styles.chatbubbleWrapper)}>
          <ChatBubble recipient={1} bubbleStyles={this.props.bubbleStyles?this.props.bubbleStyles:{}}>...</ChatBubble>
        </div>
      )
    }
    return message_nodes
  }

  render() {
    window.setTimeout(() => {
      this._scrollToBottom()
    },10)

    return (
      <div className="chat-history">
        <div ref="chat" className="outer">
          <div className="inner">
            <div className="intro">
              <p style={{color:"#000000"}}>You're chatting with a little bot I made. <br></br>It's like me – but a slightly more human.</p>
              <p style={{marginTop: 20}}>🤖</p>
            </div>
            {this._renderMessages(this.props.messages)}
          </div>
        </div>
      </div>
    )
  }

}
