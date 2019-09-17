interface MessageData {
    id: number | string;
    message: string;
    senderName?: string;
}
export default class Message {
    id: number | string;
    message: string;
    senderName?: string;
    constructor(messageData: MessageData);
}
export {};
