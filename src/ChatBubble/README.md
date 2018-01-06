## ChatBubble

The `ChatBubble` component basically just turns a given string into chat bubble. And depending on the `id` you give it, it will render in the correct colour and alignment.

#### Props

**message**: This must be a valid [Message](../Message) object.
**bubbleStyles** (optional): styles to apply to the chat bubbles _(will probably change. I will update this page with a proposal)_

```javascript
bubbleStyles={{
  userBubble: object
  chatbubble: object
  text: object
}}
```

**bubblesCentered** (optional): a boolean to determine whether the bubbles should be centered.

#### Usage

```javascript
import React from 'react';
import { ChatBubble, Message } from 'react-chat-ui';

class MyChatBubble extends React.Component {
  render() {
    const message = new Message(0, "Hello World!");
    return <ChatBubble message={message}>
  }
}
```
