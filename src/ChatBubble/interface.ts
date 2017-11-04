import Message from '../Message';
export default interface ChatBubbleProps {
  message: Message
  bubbleStyles: {
    userBubble: object
    chatbubble: object
    text: object
  }
  bubblesCentered: boolean
}
