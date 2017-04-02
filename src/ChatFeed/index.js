// Copyright 2016 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.
'use strict';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ChatBubble from '../ChatBubble/index.js'
import ChatInput from '../ChatInput/index.js'
import Message from '../Message/index.js'

export default class ChatFeed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages || [],
    }
  }

  componentDidUpdate() {
    console.log('ChatFeed update');
  }

  _scrollToBottom() {
    const {chat} = this.refs;
    const scrollHeight = chat.scrollHeight;
    const height = chat.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(chat).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  /**
    * Parses and collects messages of one type to be grouped together.
    *
    * @param {messages} - a list of Message objects
    * @param {index} - the index of the end of the message group
    * @param {type} - the type of group (user or recipient)
    * @return {message_nodes} - a JSX wrapped group of messages
    */
  _renderGroup(messages, index, id) {
    var group = []

    for (var i = index; messages[i]?(messages[i].id == id):false; i--) {
      group.push(messages[i])
    }

    var message_nodes = group.reverse().map((curr, index) => {
      return <ChatBubble
                key={Math.random().toString(36)}
                message={new Message(curr.id, curr.message)}
                bubblesCentered={this.props.bubblesCentered?true:false}
                bubbleStyles={this.props.bubbleStyles}/>
    })
    return (
      <div key={Math.random().toString(36)} style={styles.chatbubbleWrapper}>
        {message_nodes}
      </div>
    )
  }

  /**
    * Determines what type of message/messages to render.
    *
    * @param {messages} - a list of message objects
    * @return {message_nodes} - a list of message JSX objects to be rendered in
    *   our UI.
    */
  _renderMessages(messages) {
    var message_nodes = messages.map((curr, index) => {

      // Find diff in message type or no more messages
      if (
        (messages[index+1]?false:true) ||
        (messages[index+1].id != curr.id)
      ) {
        return this._renderGroup(messages, index, curr.id);
      }

    });

    // Other end is typing...
    if (this.props.isTyping) {
      message_nodes.push(
        <div key={Math.random().toString(36)} style={Object.assign({}, styles.recipient, styles.chatbubbleWrapper)}>
          <ChatBubble message={new Message(1, "...")} bubbleStyles={this.props.bubbleStyles?this.props.bubbleStyles:{}}/>
        </div>
      )
    }

    // return nodes
    return message_nodes

  }

  /**
  * render : renders our chatfeed
  */
  render() {
    window.setTimeout(() => {
      this._scrollToBottom()
    },10)

    var inputField = this.props.hasInputField ? <ChatInput></ChatInput> : null

    return (
      <div id="chat-panel" style={styles.chatPanel}>
        <div ref="chat" className="chat-history" style={styles.chatHistory}>
          <div className="chat-messages" >
            {this._renderMessages(this.props.messages)}
          </div>
        </div>
        {inputField}
      </div>
    )
  }
}

const styles = {
  chatPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  chatHistory: {
    flex: 1,
    overflow: 'scroll'
  },
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

ChatFeed.propTypes =  {
  isTyping: React.PropTypes.bool,
  hasInputField: React.PropTypes.bool,
  bubblesCentered: React.PropTypes.bool,
  bubbleStyles: React.PropTypes.object,
  messages: React.PropTypes.array.isRequired
}
