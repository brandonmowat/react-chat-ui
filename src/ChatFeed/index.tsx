// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import * as React from "react";
import BubbleGroup from "../BubbleGroup";
import DefaultChatBubble from "../ChatBubble";
import ChatInput from "../ChatInput";
import Message from "../Message";
import styles from "./styles";

// Model for ChatFeed props.
interface ChatFeedInterface {
  props: {
    bubblesCentered?: boolean;
    bubbleStyles?: object;
    chatBubble?: React.Component;
    hasInputField?: boolean;
    isTyping?: boolean;
    maxHeight?: number;
    messages: any;
    preventConflictingAutoScroll?: boolean;
    showSenderName?: boolean;
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
    querySelectorAll: Function;
  };
  _hasUserScrolledUp: boolean = false;
  _scrollOnLoadChatLogId: string;
  _scrollOnLoadClassName: string;

  constructor(props: ChatFeedInterface) {
    super(props);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
  }

  componentDidMount() {
    if (this._scrollOnLoadChatLogId) {
      this.scrollToChatLogId(
        this._scrollOnLoadChatLogId,
        this._scrollOnLoadClassName
      );
    } else {
      this.scrollToBottom();
    }

    this.chat.addEventListener("scroll", this.handleScrollEvent);
  }

  componentDidUpdate() {
    const { preventConflictingAutoScroll } = this.props;
    if (preventConflictingAutoScroll && this._hasUserScrolledUp) {
      return;
    }

    if (this._scrollOnLoadChatLogId) {
      this.scrollToChatLogId(
        this._scrollOnLoadChatLogId,
        this._scrollOnLoadClassName
      );
    } else {
      this.scrollToBottom();
    }
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
    this.chat.removeEventListener("scroll", this.handleScrollEvent);
  }

  private handleScrollEvent(event: Event) {
    if (!this.chat) return;
    const maxScrollTop = this.getMaxScrollTop();
    if (
      this.chat.scrollTop <
      maxScrollTop - ChatFeed.MANUAL_SCROLL_BOTTOM_MARGIN
    ) {
      this._hasUserScrolledUp = true;
    } else {
      this._hasUserScrolledUp = false;
    }
  }

  scrollToChatLogId(chatLogId: string, className?: string) {
    try {
      const viewPortHeight = this.chat.clientHeight;
      const scrollTopAdjustment = viewPortHeight / 2;
      const matchingNodes = this.chat.querySelectorAll(
        `[data-chat-log-id="${chatLogId}"]`
      );

      // Store ID to trigger scroll once message loads
      if (matchingNodes.length === 0) {
        this._scrollOnLoadChatLogId = chatLogId;
        this._scrollOnLoadClassName = className;
        return;
      }

      this._scrollOnLoadChatLogId = undefined;
      this._scrollOnLoadClassName = undefined;
      this._hasUserScrolledUp = true;

      const chatBubbleNode = matchingNodes[matchingNodes.length - 1];
      const parentElement = chatBubbleNode.parentElement;

      this.chat.scrollTop = parentElement.offsetTop - scrollTopAdjustment;
      if (className) {
        parentElement.classList.remove(className);
        // Trigger a reflow
        void chatBubbleNode.offsetWidth;
        parentElement.classList.add(className);
      }
    } catch {}
  }

  /**
   * Determines what type of message/messages to render.
   */
  renderMessages(messages: [Message]) {
    const { isTyping, bubbleStyles, chatBubble } = this.props;

    const ChatBubble = chatBubble || DefaultChatBubble;

    const messageNodes = messages.map((message, index) => {
      return (
        <ChatBubble
          bubbleStyles={bubbleStyles}
          key={message.id || index}
          message={message}
        />
      );
    });

    // Other end is typing...
    if (isTyping) {
      messageNodes.push(
        <div key="isTyping" style={{ ...styles.chatbubbleWrapper }}>
          <ChatBubble
            message={new Message({ id: 1, message: "...", senderName: "" })}
            bubbleStyles={bubbleStyles}
          />
        </div>
      );
    }

    // return nodes
    return <div style={styles.chatbubbleWrapper}>{messageNodes}</div>;
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
          ref={(c) => {
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
