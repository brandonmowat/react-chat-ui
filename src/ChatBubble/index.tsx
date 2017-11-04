import * as React from 'react'
import ChatBubbleProps from './interface'
import styles from './styles'

export default class ChatBubble extends React.Component {
  props

  constructor(props: ChatBubbleProps) {
    super(props)
  }

  // Helper render method for redering a chat bubble
  public renderBlueBubble() {
    const { userBubble, chatbubble, text } = this.props.bubbleStyles
    return (
      <div
        style={{
          ...styles.chatbubbleWrapper,
          ...this.props.bubblesCentered
            ? {}
            : styles.chatbubbleOrientationNormal,
        }}
      >
        <div
          style={{
            ...styles.chatbubble,
            ...chatbubble,
            ...userBubble,
          }}
        >
          <p style={{ ...styles.p, ...text }}>{this.props.message.message}</p>
        </div>
      </div>
    )
  }

  // Helper render method for redering a chat bubble
  public renderGrayBubble() {
    const { chatbubble, text } = this.props.bubbleStyles
    return (
      <div
        style={{
          ...styles.chatbubbleWrapper,
          ...this.props.bubblesCentered
            ? {}
            : styles.recipientChatbubbleOrientationNormal,
        }}
      >
        <div
          style={{
            ...styles.chatbubble,
            ...styles.recipientChatbubble,
            ...chatbubble,
          }}
        >
          <p style={{ ...styles.p, ...text }}>{this.props.message.message}</p>
        </div>
      </div>
    )
  }

  public render() {
    // message.id 0 is reserved for blue
    return this.props.message.id === 0
      ? this.renderBlueBubble()
      : this.renderGrayBubble()
  }
}

export { ChatBubbleProps }
