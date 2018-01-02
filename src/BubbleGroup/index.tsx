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
  renderGroup(messages: [Message], index: number, id: number) {
    const {
      bubblesCentered,
      bubbleStyles,
      showSenderName,
      chatBubble,
    } = this.props;
    const ChatBubble = chatBubble || DefaultChatBubble;
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
      <div key={index} style={styles.chatbubbleWrapper}>
        {showSenderName &&
          (sampleMessage.senderName !== '' &&
            (sampleMessage.id !== 0 && (
              <h5 style={styles.bubbleGroupHeader}>
                {sampleMessage.senderName}
              </h5>
            )))}
        {messageNodes}
      </div>
    );
  }

  render() {
    const { messages, index, id } = this.props;
    return this.renderGroup(messages, index, id);
  }
}
