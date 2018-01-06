# BubbleGroup

A `BubbleGroup` renders a group of [ChatBubble](../ChatBubble)'s and can show the senders name atop the group.

#### Props

* **messages** _[Message]_: A list of messages you's like to render inside one group. _All messages must have the same id_.
* **id** _number_: The id (identifier for the type of bubble i.e., gray or blue. 0 is reserved for the blue bubble).
* **showSenderName** _boolean_: Should the sender's name appear atop the group?
* **senderName** _string_: The sender's name. If this is undefined and `showSenderName` is true, it will sample the first message in the `messages`.
* **chatBubble** _ChatBubble_ (optional): the type of bubble you'd like to render. (Default is [ChatBubble](../ChatBubble)).

#### Usage

```javascript
<BubbleGroup
  messages={messageGroup}
  id={message.id}
  showSenderName={showSenderName}
  chatBubble={MyChatBubble}
/>
```
