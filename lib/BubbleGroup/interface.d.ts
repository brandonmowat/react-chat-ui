import { Message, ChatBubble } from '../';
export default interface BubbleGroupInterface {
    messages: Message[];
    id: number | string;
    showSenderName: boolean;
    chatBubble: ChatBubble;
    key?: string | number;
    bubbleStyles?: object;
}
