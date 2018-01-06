import { Message, ChatBubble } from '../';
export default interface BubbleGroupInterface {
  messages: [Message];
  id: number;
  showSenderName: boolean;
  chatBubble: ChatBubble;
};
