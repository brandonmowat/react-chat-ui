/**
* A statndardized message object for use
* in rendering messages in the chat feed.
*/

interface MessageData {
  id: number;
  message: string;
  senderName: string;
}

export default class Message {
  /**
    * Message object for organizing and storing current message data.
    *
    * @param {Object} messageData - a JSON object containing all the data for a message.
    * @param {number} messageData.id - id for grouping messages (0 for blue)
    * @param {(string|html)} messageData.message - the content of the message to
    *   be rendered in the bubble
    * @param {string} [messageData.senderName] - the name of the sender of the
    *   message
    */
  id: number;
  message: string;
  senderName: string;
  constructor(messageData: MessageData) {
    this.id = messageData.id; // id of the sender (0 is reserved for "blue bubble")
    this.message = messageData.message;
    this.senderName = messageData.senderName || undefined;
  }
}
