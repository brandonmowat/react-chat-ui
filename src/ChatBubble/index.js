import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  chatbubbleWrapper: {
    clear: 'both',
  },
  chatbubble: {
    backgroundColor: '#0084FF',
    borderRadius: 20,
    marginTop: 1,
    marginRight: 'auto',
    marginBottom: 1,
    marginLeft: 'auto',
    maxWidth: 425,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    width: '-webkit-fit-content',
  },
  chatbubbleOrientationNormal: {
    float: 'right',
  },
  recipientChatbubble: {
    backgroundColor: '#ccc',
  },
  recipientChatbubbleOrientationNormal: {
    float: 'left',
  },
  p: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    margin: 0,
  },
};

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
