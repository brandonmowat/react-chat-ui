import * as React from 'react';
import anchorme from 'anchorme';
import ChatBubbleProps from './interface';
import styles from './styles';

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {},
};

export default class ChatBubble extends React.Component {
  props;

  constructor(props: ChatBubbleProps) {
    super(props);
  }

  renderMessageString = text => (
    <p style={{ ...styles.p, ...text }} dangerouslySetInnerHTML={{
      __html: anchorme(text, {
        attributes: [{
          name: 'target',
          value: '_blank'
        },
        {
          name: 'class',
          value: 'message-link'
        }]
      })
    }} />
  );

  public render() {
    const { bubblesCentered } = this.props;
    let { bubbleStyles } = this.props;
    bubbleStyles = bubbleStyles || defaultBubbleStyles;
    const { userBubble, chatbubble, text } = bubbleStyles;

    // message.id 0 is reserved for blue
    const chatBubbleStyles =
      this.props.message.id === 0
        ? {
            ...styles.chatbubble,
            ...bubblesCentered ? {} : styles.chatbubbleOrientationNormal,
            ...chatbubble,
            ...userBubble,
          }
        : {
            ...styles.chatbubble,
            ...styles.recipientChatbubble,
            ...bubblesCentered
              ? {}
              : styles.recipientChatbubbleOrientationNormal,
            ...chatbubble,
            ...userBubble,
          };

    return (
      <div
        style={{
          ...styles.chatbubbleWrapper,
        }}
      >
        <div style={chatBubbleStyles}>
         {this.renderMessageString(this.props.message.message)}
        </div>
      </div>
    );
  }
}

export { ChatBubbleProps };
