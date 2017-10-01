import React from 'react';
import { render } from 'react-dom';
import { ChatFeed, Message, ChatBubble } from '../lib';

const styles = {
  button: {
    backgroundColor: '#fff',
    borderColor: '#1D2129',
    borderStyle: 'solid',
    borderRadius: 20,
    borderWidth: 2,
    color: '#1D2129',
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  selected: {
    color: '#fff',
    backgroundColor: '#0084FF',
    borderColor: '#0084FF',
  },
};

const users = {
  0: 'You',
  1: 'Mark',
  2: 'Evan',
};

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
        new Message({ id: 1, message: 'Hey guys!', senderName: 'Mark' }),
        new Message({
          id: 2,
          message: 'Hey! Evan here. react-chat-ui is pretty dooope.',
          senderName: 'Evan',
        }),
      ],
      curr_user: 0,
    };
  }

  onPress(user) {
    this.setState({ curr_user: user });
  }

  onMessageSubmit(e) {
    const input = this.message;
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    this.pushMessage(this.state.curr_user, input.value);
    input.value = '';
    return true;
  }

  pushMessage(recipient, message) {
    const prevState = this.state;
    const newMessage = new Message({ id: recipient, message, senderName: users[recipient] });
    prevState.messages.push(newMessage);
    this.setState(this.state);
  }

  render() {
    return (
      <div>
        <ChatFeed
          messages={this.state.messages} // Boolean: list of message objects
          showSenderName
          bubbleStyles={{
            // JSON: Custom bubble styles
            text: {
              fontSize: 16,
            },
            chatbubble: {
              maxWidth: 600,
            },
            userBubble: {
              backgroundColor: '#0084FF',
            },
          }}
        />

        <form onSubmit={e => this.onMessageSubmit(e)}>
          <input
            ref={(m) => {
              this.message = m;
            }}
            placeholder="Type a message..."
            className="message-input"
          />
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button
            style={{ ...styles.button, ...(this.state.curr_user === 0 ? styles.selected : {}) }}
            onClick={() => this.onPress(0)}
          >
            You
          </button>
          <button
            style={{ ...styles.button, ...(this.state.curr_user === 1 ? styles.selected : {}) }}
            onClick={() => this.onPress(1)}
          >
            Mark
          </button>
          <button
            style={{ ...styles.button, ...(this.state.curr_user === 2 ? styles.selected : {}) }}
            onClick={() => this.onPress(2)}
          >
            Evan
          </button>
        </div>
      </div>
    );
  }
}

render(<Chat />, document.getElementById('chat-ui'));
