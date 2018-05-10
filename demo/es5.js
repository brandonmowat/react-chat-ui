'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
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
    paddingRight: 16
  },
  selected: {
    color: '#fff',
    backgroundColor: '#0084FF',
    borderColor: '#0084FF'
  }
};

var users = {
  0: 'You',
  Mark: 'Mark',
  2: 'Evan'
};

var customBubble = function customBubble(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      props.message.senderName + ' ' + (props.message.id ? 'says' : 'said') + ': ' + props.message.message
    )
  );
};

var Chat = function (_React$Component) {
  _inherits(Chat, _React$Component);

  function Chat() {
    _classCallCheck(this, Chat);

    var _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this));

    _this.state = {
      messages: [new _lib.Message({ id: 'Mark', message: 'Hey guys!', senderName: 'Mark' }), new _lib.Message({
        id: 2,
        message: 'Hey! Evan here. react-chat-ui is pretty dooope.',
        senderName: 'Evan'
      })],
      useCustomBubble: false,
      curr_user: 0
    };
    return _this;
  }

  _createClass(Chat, [{
    key: 'onPress',
    value: function onPress(user) {
      this.setState({ curr_user: user });
    }
  }, {
    key: 'onMessageSubmit',
    value: function onMessageSubmit(e) {
      var input = this.message;
      e.preventDefault();
      if (!input.value) {
        return false;
      }
      this.pushMessage(this.state.curr_user, input.value);
      input.value = '';
      return true;
    }
  }, {
    key: 'pushMessage',
    value: function pushMessage(recipient, message) {
      var prevState = this.state;
      var newMessage = new _lib.Message({
        id: recipient,
        message: message,
        senderName: users[recipient]
      });
      prevState.messages.push(newMessage);
      this.setState(this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'h1',
          { className: 'text-center' },
          'react-chat-ui'
        ),
        _react2.default.createElement(
          'p',
          { className: 'text-center' },
          _react2.default.createElement(
            'a',
            {
              href: 'https://github.com/brandonmowat/react-chat-ui',
              target: '_blank'
            },
            'Github'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'install' },
          _react2.default.createElement(
            'code',
            null,
            'npm i -S react-chat-ui'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'chatfeed-wrapper' },
          _react2.default.createElement(_lib.ChatFeed, {
            chatBubble: this.state.useCustomBubble && customBubble,
            maxHeight: 250,
            messages: this.state.messages // Boolean: list of message objects
            , showSenderName: true
          }),
          _react2.default.createElement(
            'form',
            { onSubmit: function onSubmit(e) {
                return _this2.onMessageSubmit(e);
              } },
            _react2.default.createElement('input', {
              ref: function ref(m) {
                _this2.message = m;
              },
              placeholder: 'Type a message...',
              className: 'message-input'
            })
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-around' } },
            _react2.default.createElement(
              'button',
              {
                style: _extends({}, styles.button, this.state.curr_user === 0 ? styles.selected : {}),
                onClick: function onClick() {
                  return _this2.onPress(0);
                }
              },
              'You'
            ),
            _react2.default.createElement(
              'button',
              {
                style: _extends({}, styles.button, this.state.curr_user === 'Mark' ? styles.selected : {}),
                onClick: function onClick() {
                  return _this2.onPress('Mark');
                }
              },
              'Mark'
            ),
            _react2.default.createElement(
              'button',
              {
                style: _extends({}, styles.button, this.state.curr_user === 2 ? styles.selected : {}),
                onClick: function onClick() {
                  return _this2.onPress(2);
                }
              },
              'Evan'
            )
          ),
          _react2.default.createElement(
            'div',
            {
              style: { display: 'flex', justifyContent: 'center', marginTop: 10 }
            },
            _react2.default.createElement(
              'button',
              {
                style: _extends({}, styles.button, this.state.useCustomBubble ? styles.selected : {}),
                onClick: function onClick() {
                  return _this2.setState({ useCustomBubble: !_this2.state.useCustomBubble });
                }
              },
              'Custom Bubbles'
            )
          )
        ),
        _react2.default.createElement(
          'h2',
          { className: 'text-center' },
          'There are Bubbles!'
        ),
        _react2.default.createElement(_lib.ChatBubble, {
          message: new _lib.Message({ id: 1, message: 'I float to the left!' })
        }),
        _react2.default.createElement(_lib.ChatBubble, {
          message: new _lib.Message({ id: 0, message: 'I float to the right!' })
        }),
        _react2.default.createElement(
          'h2',
          { className: 'text-center' },
          'And we have Bubble Groups!'
        ),
        _react2.default.createElement(_lib.BubbleGroup, {
          messages: [new _lib.Message({ id: 1, message: 'Hey!' }), new _lib.Message({ id: 1, message: 'I forgot to mention...' }), new _lib.Message({
            id: 1,
            message: "Oh no, I forgot... I think I was going to say I'm a BubbleGroup"
          })],
          id: 1,
          showSenderName: true,
          senderName: 'Elon Musk'
        }),
        _react2.default.createElement(_lib.ChatBubble, {
          message: new _lib.Message({ id: 2, message: "I 'm a single ChatBubble!" })
        }),
        _react2.default.createElement(_lib.BubbleGroup, {
          messages: [new _lib.Message({ id: 0, message: 'How could you forget already?!' }), new _lib.Message({
            id: 0,
            message: "Oh well. I'm a BubbleGroup as well"
          })],
          id: 1,
          showSenderName: true,
          senderName: 'Elon Musk'
        })
      );
    }
  }]);

  return Chat;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(Chat, null), document.getElementById('chat-ui'));
