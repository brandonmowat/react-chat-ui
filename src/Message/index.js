/**
* A statndardized message object for use
* in rendering messages in the chat feed.
*/
export default class Message {
  constructor(id, message, senderName) {
    this.id = id; // id of the sender (0 is reserved for "blue bubble")
    this.message = message;
    this.senderName = senderName || undefined;
  }
}
