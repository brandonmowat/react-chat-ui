import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

export default class ChatBubble extends Component {
  componentDidMount() {}

  // Helper render method for redering a chat bubble
  renderBlueBubble() {
    const { message, bubbleStyles, bubblesCentered } = this.props;
    const { userBubble, chatbubble, text } = bubbleStyles;
    return (
      <div
        style={{
          ...styles.chatbubbleWrapper,
          ...(bubblesCentered || styles.chatbubbleOrientationNormal),
        }}
      >
        <div
          style={{
            ...styles.chatbubble,
            ...chatbubble,
            ...userBubble,
          }}
        >
          <p style={{ ...styles.p, ...text }}>{message.message}</p>
        </div>
      </div>
    );
  }

  // Helper render method for redering a chat bubble
  renderGrayBubble() {
    const { message, bubbleStyles, bubblesCentered } = this.props;
    const { chatbubble, text } = bubbleStyles;
    return (
      <div
        style={{
          ...styles.chatbubbleWrapper,
          ...(bubblesCentered || styles.recipientChatbubbleOrientationNormal),
        }}
      >
        {message.senderName && <h5 style={styles.bubbleHeader}>{message.senderName}</h5>}
        <div
          style={{
            ...styles.chatbubble,
            ...styles.recipientChatbubble,
            ...chatbubble,
          }}
        >
          <p style={{ ...styles.p, ...text }}>{message.message}</p>
        </div>
      </div>
    );
  }

  render() {
    const { message } = this.props;
    // message.id 0 is reserved for blue
    return message.id === 0 ? this.renderBlueBubble() : this.renderGrayBubble();
  }
}

ChatBubble.propTypes = {
  bubbleStyles: PropTypes.object,
  message: PropTypes.object,
  bubblesCentered: PropTypes.bool,
};

ChatBubble.defaultProps = {
  bubbleStyles: {},
  message: { id: 0, message: "I'm a chat message" },
  bubblesCentered: false,
};
