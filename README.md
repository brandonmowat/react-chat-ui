![react-chat-ui logo](https://i.imgur.com/YhPrFWw.png)

# 🙊  react-chat-ui
A library of React components for building chat UI's.

[![NPM](https://nodei.co/npm/react-chat-ui.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-chat-ui/)

### Features
- Auto scroll to bottom
- SUPER easy to use
- Multiple user grouping (try it out in the demo)

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
    (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble
    (new Message({ id: 0, message: "I'm you -- the blue bubble!" })) // Blue bubble
  ],
  //...
}
//...

```

### TODO
- documentation
- documentation
- documentation

### Development

```sh
npm run dev
```
