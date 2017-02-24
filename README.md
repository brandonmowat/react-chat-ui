![react-chat-ui logo](https://i.imgur.com/YhPrFWw.png)

# 🙊  react-chat-ui
A library of React components for building chat UI's.

### !!Use at own risk!!
This project is still in the VERY early stages of development. If you encounter a bug or have a feature request, please create an issue and/or tweet at me [here](http://twitter.com/brandonmowat).

### Installation
`npm install react-chat-ui --save`

### Basic Usage
```javascript
import { ChatFeed, Message } from 'react-chat-ui'

// Your code stuff...

render() {

  return (

    // Your JSX...

    <ChatFeed
      messages={this.state.messages} // Boolean: list of message objects
      isTyping={this.state.is_typing} // Boolean: is the recipient typing
      hasInputField={false} // Boolean: use our input, or use your own
      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      // JSON: Custom bubble styles
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

    // Your JSX...

  )

}
```

Make sure to keep a list of proper message objects in your class state.
Like so:
```javascript

//...
this.state = {
  messages : [
    // To be deprecated and use Message objects instead.
    (new Message(1, "I'm the recipient! (The person you're talking to)")), // Gray bubble
    (new Message(0, "I'm you -- the blue bubble!")) // Blue bubble
  ],
  //...
}
//...

```

### Development

```sh
browserify demo/es5.js -o demo/bundle.js
```
