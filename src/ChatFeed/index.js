// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChatBubble from '../ChatBubble';
import ChatInput from '../ChatInput';
import Message from '../Message';
import styles from './styles';

export default class ChatFeed extends Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.chat.scrollHeight;
    const height = this.chat.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  /**
    * Parses and collects messages of one type to be grouped together.
    *
    * @param {key} - a unique key for the group
    * @param {messages} - a list of Message objects
    * @param {index} - the index of the end of the message group
    * @param {type} - the type of group (user or recipient)
    * @return {messageNodes} - a JSX wrapped group of messages
    */
  renderGroup(key, messages, index, id) {
    const { bubblesCentered, bubbleStyles, showSenderName } = this.props;
    const group = [];

    for (let i = index; messages[i] ? messages[i].id === id : false; i -= 1) {
      group.push(messages[i]);
    }

    const sampleMessage = group[0];

    const messageNodes = group.reverse().map((curr, i) => (
      <ChatBubble
        key={i} // HACK: fix this pls
        message={curr}
        bubblesCentered={bubblesCentered}
        bubbleStyles={bubbleStyles}
      />
    ));
    return (
      <div key={key} style={styles.chatbubbleWrapper}>
        {showSenderName &&
          (sampleMessage.senderName !== '' &&
            (sampleMessage.id !== 0 && (
              <h5 style={styles.bubbleGroupHeader}>{sampleMessage.senderName}</h5>
            )))}
        {messageNodes}
      </div>
    );
  }

  /**
    * Determines what type of message/messages to render.
    *
    * @param {messages} - a list of message objects
    * @return {messageNodes} - a list of message JSX objects to be rendered in
    *   our UI.
    */
  renderMessages(messages) {
    const { isTyping, bubbleStyles } = this.props;

    const messageNodes = messages.map((curr, index) => {
      // Find diff in message type or no more messages
      if (!messages[index + 1] || messages[index + 1].id !== curr.id) {
        return this.renderGroup(index, messages, index, curr.id);
      }
      return null;
    });

    // Other end is typing...
    if (isTyping) {
      messageNodes.push(
        <div
          key={Math.random().toString(36)}
          style={{ ...styles.recipient, ...styles.chatbubbleWrapper }}
        >
          <ChatBubble
            message={new Message({ id: 1, message: '...' })}
            bubbleStyles={bubbleStyles}
          />
        </div>,
      );
    }

    // return nodes
    return messageNodes;
  }

  /**
  * render : renders our chatfeed
  */
  render() {
    const inputField = this.props.hasInputField && <ChatInput />;

    return (
      <div id="chat-panel" style={styles.chatPanel}>
        <div
          ref={(c) => {
            this.chat = c;
          }}
          className="chat-history"
          style={styles.chatHistory}
        >
          <div className="chat-messages">{this.renderMessages(this.props.messages)}</div>
        </div>
        {inputField}
      </div>
    );
  }
}

ChatFeed.propTypes = {
  isTyping: PropTypes.bool,
  showSenderName: PropTypes.bool,
  hasInputField: PropTypes.bool,
  bubblesCentered: PropTypes.bool,
  bubbleStyles: PropTypes.object,
  messages: PropTypes.array,
};

ChatFeed.defaultProps = {
  isTyping: false,
  showSenderName: false,
  hasInputField: false,
  bubblesCentered: false,
  bubbleStyles: {},
  messages: [],
};
