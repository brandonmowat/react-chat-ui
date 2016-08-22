'use strict';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ChatBubble from './ChatBubble'

export default class ChatFeed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
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

  _renderGroup(messages, index) {
    var group = []

    for (var i = index; messages[i] ? messages[i].type : false; i--) {
      group.push(messages[i])
    }

    var message_nodes = group.reverse().map((curr, index) => {
      return <ChatBubble>{curr.message}</ChatBubble>
    })
    return (
      <div key={Math.random().toString(36)} className="recipient">
        <img src="../assets/me.jpg"/>
        {message_nodes}
      </div>
    )
  }

  _renderMessages(messages) {
    var message_nodes = messages.map((curr, index) => {

      if (!(messages[index-1] ? messages[index-1].type : false) && curr.type && !(messages[index+1] ? messages[index+1].type : false)) {
        console.log("Single message");
        return (
          <div key={Math.random().toString(36)} className="recipient">
            <img src="../assets/me.jpg"/>
            <ChatBubble>{curr.message}</ChatBubble>
          </div>
        )
      }
      else if (curr.type && (messages[index-1] ? messages[index-1].type : false) && !(messages[index+1] ? messages[index+1].type : false)) {
        return this._renderGroup(messages, index)
      }

      else if (!curr.type) {
        return (<div key={Math.random().toString(36)}><ChatBubble>{curr.message}</ChatBubble></div>)
      }

    })
    if (this.props.is_typing) {
      message_nodes.push(
        <div key={Math.random().toString(36)} className="recipient">
          <img src="../assets/me.jpg"/>
          <ChatBubble>...</ChatBubble>
        </div>
      )
    }
    return message_nodes
  }

  render() {
    // window.setTimeout(() => {
    //   this._scrollToBottom()
    // },10)

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
