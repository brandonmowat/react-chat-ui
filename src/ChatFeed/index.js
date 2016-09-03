'use strict';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ChatBubble from '../ChatBubble/index.js'

const styles = {

  chatbubbleWrapper: {
    marginTop: 10,
    marginBottom: 10,
    overflow: 'auto',
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

  // Render Our Messages
  _renderGroup(messages, index, type) {
    var group = []

    for (var i = index; messages[i]?(messages[i].type == type):false; i--) {
      group.push(messages[i])
    }
    console.log(group);

    var message_nodes = group.reverse().map((curr, index) => {
      return <ChatBubble key={Math.random().toString(36)} recipient={curr.type} bubbleStyles={this.props.bubbleStyles}>{curr.message}</ChatBubble>
    })
    return (
      <div key={Math.random().toString(36)} style={styles.chatbubbleWrapper}>
        {message_nodes}
      </div>
    )
  }

  _renderMessages(messages) {
    // map messages
    var message_nodes = messages.map((curr, index) => {

      // Find diff in message type or no more messages
      if (
        (messages[index+1]?false:true) ||
        (messages[index+1].type != curr.type)
      ) {
        // Render group
        return this._renderGroup(messages, index, curr.type);
      }

    });

    // Other end is typing...
    if (this.props.is_typing) {
      message_nodes.push(
        <div key={Math.random().toString(36)} style={Object.assign({}, styles.recipient, styles.chatbubbleWrapper)}>
          <ChatBubble recipient={1} bubbleStyles={this.props.bubbleStyles?this.props.bubbleStyles:{}}>...</ChatBubble>
        </div>
      )
    }

    // return nodes
    console.log();
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
            {this._renderMessages(this.props.messages)}
          </div>
        </div>
      </div>
    )
  }

}
