// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import * as React from 'react';
import { debounce } from 'ts-debounce';
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
    disableScrollDistance?: number;
    onScrollUp?:()=>void;
    onScrollDown?:()=>void;
  };
}

type ChatFeedState = {
  autoScrollDisabled: boolean
}

type ChatView = {
  scrollHeight: number;
  clientHeight: number;
  scrollTop: number;
} & HTMLDivElement

// React component to render a complete chat feed
export default class ChatFeed extends React.PureComponent {
  props;
  chat: ChatView;
  setState: <K extends keyof ChatFeedState>(state: Pick<ChatFeedState, K>, callback?: () => any)=>void;
  state : ChatFeedState= {
    autoScrollDisabled: false
  };

  constructor(props: ChatFeedInterface) {
    super(props);
  }

  scrollListener(e){
    const target = e.target as HTMLDivElement;
      if(this.props.disableScrollDistance ){
        const scrollUp = this.chat.scrollHeight - this.chat.clientHeight - target.scrollTop;
        if(scrollUp >= this.props.disableScrollDistance){
          // disable auto scroll to bottom
          this.props.onScrollUp && !this.state.autoScrollDisabled && this.props.onScrollUp();
          this.setState({autoScrollDisabled: true});
        }else{
          // enable auto scroll to bottom
          this.props.onScrollDown && this.state.autoScrollDisabled && this.props.onScrollDown();
          this.setState({autoScrollDisabled: false})
        }
      }
    
  }

  componentDidMount() {
    this.scrollToBottom();
    this.chat.addEventListener("scroll", debounce((e)=>{
      this.scrollListener(e)
    }, 300))
  }

  componentWillUnmount(){
    this.chat.removeEventListener("scroll", this.scrollListener)
  }
  
  componentDidUpdate(prevProps={messages:[]}) {
    if (
      !this.state.autoScrollDisabled &&
      this.props.messages &&
      prevProps.messages &&
      this.props.messages.length !== prevProps.messages.length
    ) {
      setTimeout(() => this.scrollToBottom(), 200);
    }
  }

  scrollToBottom() {
    const scrollHeight = this.chat.scrollHeight;
    const height = this.chat.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
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
