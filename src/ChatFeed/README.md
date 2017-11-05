## ChatFeed
The `ChatFeed` `Component` is probably the most important component in `react-chat-ui`. This is where all the logic is for powering the UI; message grouping, auto scrolldown, ect,.

#### Props
* **bubblesCentered**: `Boolean` - should the bubbles be centered in the `ChatFeed`?
* **bubbleStyles**: `Object` - some custom styles to be applied to the bubble div and/or text within the bubble.
* **isTyping**: `Boolean` - Should we append an ellipses to the end of the feed?
* **messages**: `Array` - An array of `Message` objects. The `ChatFeed` will convert these to bubbles for you and handle all rendering logic.
* **showSenderName**: `Boolean` - Should the bubbles show the name of the sender?

```javascript
<ChatFeed
  messages={this.state.messages}
  showSenderName
  bubbleStyles={
    {
      text: {
        fontSize: 30
      },
      chatbubble: {
        borderRadius: 70,
        padding: 40
      }
    }
  }
/>
```
