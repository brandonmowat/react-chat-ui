import * as React from 'react';
import BubbleGroupInterface from './interface';
import DefaultChatBubble from '../ChatBubble';
import Message from '../Message';
import styles from './styles';

export default class BubbleGroup extends React.Component {
  props;

  constructor(props: BubbleGroupInterface) {
    super(props);
  }

  /**
   * Parses and collects messages of one type to be grouped together.
   * @return {messageNodes} - a JSX wrapped group of messages
   */
  renderGroup(messages: [Message], id: number) {
    const {
      bubblesCentered,
      bubbleStyles,
      showSenderName,
      chatBubble,
      senderName,
    } = this.props;
    const ChatBubble = chatBubble || DefaultChatBubble;
    const sampleMessage = messages[0];

    const messageNodes = messages.map((message, i) => {
      return (
        <ChatBubble
          key={i}
          message={message}
          bubblesCentered={bubblesCentered}
          bubbleStyles={bubbleStyles}
        />
      );
    });

    return (
      <div style={styles.chatbubbleWrapper}>
        {showSenderName &&
          ((senderName || sampleMessage.senderName) !== '' &&
            (sampleMessage.id !== 0 && (
              <h5 style={styles.bubbleGroupHeader}>
                {senderName || sampleMessage.senderName}
              </h5>
            )))}
        {messageNodes}
      </div>
    );
  }

  render() {
    const { messages, id } = this.props;
    return this.renderGroup(messages, id);
  }
}
