import { Message, ChatBubble } from '../';
import { BubbleStyles } from '../ChatBubble/interface';
export default interface BubbleGroupInterface {
  key: number;
  messages: Message[];
  id: number | string;
  showSenderName: boolean;
  chatBubble: ChatBubble;
  bubbleStyles: BubbleStyles;
};
