## ChatFeed
The `ChatFeed` `Component` is probably the most important component in `react-chat-ui`. This is where all the logic is for powering the UI; message grouping, auto scrolldown, ect,.

#### Props
* **bubblesCentered**: `Boolean` - should the bubbles be centered in the `ChatFeed`?
* **bubbleStyles**: `Object` - some custom styles to be applied to the bubble div and/or text within the bubble.
* **chatBubble** *new*: `React.Component` - A custom chat bubble that you can make yourself! (If you're using TypeScript for your project, you can `import` the `ChatBubbleProps` for your components `constructor`)
* **isTyping**: `Boolean` - Should we append an ellipses to the end of the feed?
* **messages**: `Array` - An array of `Message` objects. The `ChatFeed` will convert these to bubbles for you and handle all rendering logic.
* **showSenderName**: `Boolean` - Should the bubbles show the name of the sender?

```javascript
import React from 'react'
import { ChatFeed, Message, ChatBubbleProps } from 'react-chat-ui'
import MyChatBubble from './MyChatBubble'

class MyChat extends React.Component {
  render() {
    return (
      <ChatFeed
        chatBubble={MyChatBubble}
        messages={this.state.messages}
        showSenderName
        bubbleStyles={{
          text: {
            fontSize: 30
          },
          chatbubble: {
            borderRadius: 70,
            padding: 40
          }
        }}
      />
    )
  }
}
```
