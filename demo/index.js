import React from 'react'
import { render } from 'react-dom'
import { ChatFeed, Message } from '../lib'

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      messages : [
        (new Message(1, "test")),
        (new Message(1, "wow"))
      ],
      is_typing: false
    }
  }

  _pushMessage(recipient, message) {
    var prevState = this.state
    prevState.messages.push(new Message(recipient, message))
    this.setState(this.state)
  }

  _onMessageSubmit(e) {
    var input = this.refs.message;
    e.preventDefault();
    console.log("submit!");
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
          hasInputField={false} // Boolean: use our input, or use your own
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          bubbleStyles={{ // JSON: Custom bubble styles
            text: {
              fontSize: 18
            },
            chatbubble: {
              maxWidth: 600
            },
            userBubble: {
              backgroundColor: '#0084FF'
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
