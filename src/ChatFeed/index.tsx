// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import * as React from 'react';
import ChatBubble from '../ChatBubble';
import ChatInput from '../ChatInput';
import Message from '../Message';
import styles from './styles';

interface ChatFeedProps {}

export default class ChatFeed extends React.Component {
  chat: {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
  };
  props: {
    bubblesCentered: boolean;
    bubbleStyles: object;
    hasInputField: boolean;
    isTyping: boolean;
    messages: any;
    showSenderName: boolean;
  };

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
  * @return {messageNodes} - a JSX wrapped group of messages
  */
  renderGroup(key: number, messages: [Message], index: number, id: number) {
    const { bubblesCentered, bubbleStyles, showSenderName } = this.props;
    const group = [];

    for (let i = index; messages[i] ? messages[i].id === id : false; i -= 1) {
      group.push(messages[i]);
    }

    const sampleMessage = group[0];

    const messageNodes = group.reverse().map((curr, i) => {
      return (
        <ChatBubble
          key={i}
          message={curr}
          bubblesCentered={bubblesCentered}
          bubbleStyles={bubbleStyles}
        />
      );
    });

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
  */
  renderMessages(messages: [Message]) {
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
            message={new Message({ id: 1, message: '...', senderName: '' })}
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
          ref={c => {
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
