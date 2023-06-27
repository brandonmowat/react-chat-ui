// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import * as React from 'react';
import BubbleGroup from '../BubbleGroup';
import DefaultChatBubble from '../ChatBubble';
import ChatInput from '../ChatInput';
import Message from '../Message';
import styles from './styles';

// Model for ChatFeed props.
interface ChatFeedInterface {
  props: {
    bubblesCentered?: boolean;
    bubbleStyles?: object;
    hasInputField?: boolean;
    isTyping?: boolean;
    maxHeight?: number;
    messages: any;
    showSenderName?: boolean;
    chatBubble?: React.Component;
    preventConflictingAutoScroll?: boolean;
  };
}

// React component to render a complete chat feed
export default class ChatFeed extends React.Component<ChatFeedInterface> {
  static defaultProps = {
    preventConflictingAutoScroll: true,
  };
  // If the user scrolls this close to the bottom of the feed, we will re-enable autoscroll
  static MANUAL_SCROLL_BOTTOM_MARGIN = 20;

  props;
  chat: {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
    addEventListener: Function;
    removeEventListener: Function;
  };
  _hasUserScrolledUp: boolean = false;

  constructor(props: ChatFeedInterface) {
    super(props);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
    this.chat.addEventListener('scroll', this.handleScrollEvent);
  }

  componentDidUpdate() {
    const {preventConflictingAutoScroll} = this.props;
    if (preventConflictingAutoScroll && this._hasUserScrolledUp) {
      return;
    }
    this.scrollToBottom();
  }

  private getMaxScrollTop(): number {
    if (!this.chat) return 0;
    const scrollHeight = this.chat.scrollHeight;
    const height = this.chat.clientHeight;
    return scrollHeight - height;
  }

  scrollToBottom() {
    const maxScrollTop = this.getMaxScrollTop();
    this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentWillUnmount(): void {
    this.chat.removeEventListener('scroll', this.handleScrollEvent);
  }

  private handleScrollEvent(event: Event) {
    if (!this.chat) return;
    const maxScrollTop = this.getMaxScrollTop();
    if (this.chat.scrollTop < maxScrollTop - ChatFeed.MANUAL_SCROLL_BOTTOM_MARGIN) {
      this._hasUserScrolledUp = true;
    } else {
      this._hasUserScrolledUp = false;
    }
  }

  /**
   * Determines what type of message/messages to render.
   */
  renderMessages(messages: [Message]) {
    const { isTyping, bubbleStyles, chatBubble, showSenderName } = this.props;

    const ChatBubble = chatBubble || DefaultChatBubble;

    let group = [];

    const messageNodes = messages.map((message, index) => {
      group.push(message);
      // Find diff in message type or no more messages
      if (index === messages.length - 1 || messages[index + 1].id !== message.id) {
        const messageGroup = group;
        group = [];
        return (
          <BubbleGroup
            key={index}
            messages={messageGroup}
            id={message.id}
            showSenderName={showSenderName}
            chatBubble={ChatBubble}
            bubbleStyles={bubbleStyles}
          />
        );
      }

      return null;
    });

    // Other end is typing...
    if (isTyping) {
      messageNodes.push(
        <div key="isTyping" style={{ ...styles.chatbubbleWrapper }}>
          <ChatBubble
            message={new Message({ id: 1, message: '...', senderName: '' })}
            bubbleStyles={bubbleStyles}
          />
        </div>
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
    const { maxHeight } = this.props;

    return (
      <div id="chat-panel" style={styles.chatPanel}>
        <div
          ref={c => {
            this.chat = c;
          }}
          className="chat-history"
          style={{ ...styles.chatHistory, maxHeight }}
        >
          <div className="chat-messages">
            {this.renderMessages(this.props.messages)}
          </div>
        </div>
        {inputField}
      </div>
    );
  }
}
