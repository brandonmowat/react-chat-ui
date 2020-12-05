import Message from '../Message';

export interface BubbleStyles {
  userBubble: object
  chatbubble: object
  text: object
}
export default interface ChatBubbleProps {
  message: Message
  bubbleStyles: BubbleStyles,
  bubblesCentered: boolean
}
