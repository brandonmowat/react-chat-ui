import { Message, ChatBubble } from '../';
export default interface BubbleGroupInterface {
  messages: [Message];
  index: number;
  id: number;
  showSenderName: boolean;
  chatBubble: ChatBubble;
};
