## ChatFeed

The `ChatFeed` component is your one stop shop for all your chat needs. If you don't want to manage your own chat feed, this is a great place to start. You don't need to worry about anything other than your messages.

#### Props

* **bubblesCentered**: `Boolean` - should the bubbles be centered in the `ChatFeed`?
* **bubbleStyles**: `Object` - some custom styles to be applied to the bubble div and/or text within the bubble.
* **chatBubble** _new_: `React.Component` - A custom chat bubble that you can make yourself! (If you're using TypeScript for your project, you can `import` the `ChatBubbleProps` for your components `constructor`)
* **isTyping**: `Boolean` - Should we append an ellipses to the end of the feed?
* **maxHeight**: `number` - The max height of the chat feed, in pixels.
* **messages**: `Array` - An array of `Message` objects. The `ChatFeed` will convert these to bubbles for you and handle all rendering logic.
* **showSenderName**: `Boolean` - Should the bubbles show the name of the sender?

```javascript
import React from 'react';
import { ChatFeed, Message, ChatBubbleProps } from 'react-chat-ui';
import MyChatBubble from './MyChatBubble';

class MyChat extends React.Component {
  render() {
    return (
      <ChatFeed
        chatBubble={MyChatBubble}
        messages={this.state.messages}
        showSenderName
      />
    );
  }
}
```
