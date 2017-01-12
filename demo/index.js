import React from 'react'
import { render } from 'react-dom'
import { ChatFeed } from '../lib'

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      messages : [
        {type:1, message: "Hey there you!"}, // Gray bubble
        {type:1, message: "What have you been up to?"}
      ],
      is_typing: false
    }
  }

  _pushMessage(recipient, message) {
    var prevState = this.state
    prevState.messages.push({type: recipient, message: message})
    this.setState(this.state)
  }

  _onMessageSubmit(e) {
    var input = this.refs.message;
    e.preventDefault();
    if (!input.value) {return false;}
    this._pushMessage(0, input.value)
    input.value = '';

  }

  render() {
    return(
      <div>
        <ChatFeed
          messages={this.state.messages} // Boolean: list of message objects
          isTyping={this.state.is_typing} // Boolean: is the recipient typing
          bubbleStyles={{ // JSON: Custom bubble styles
            text: {
              fontSize: 18,
            },
            chatbubble: {
              maxWidth: 600,
            },
            userBubble: {
              backgroundColor: '#0084FF',
            }
          }}
        />

      <form onSubmit={this._onMessageSubmit.bind(this)}>
        <input ref="message" placeholder="Type a message..." className="message-input" />
      </form>
      </div>
    )
  }
}

render(
  (<Chat/>)
  ,
  document.getElementById('chat-ui')
)
