'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chat = function (_React$Component) {
  _inherits(Chat, _React$Component);

  function Chat() {
    _classCallCheck(this, Chat);

    var _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this));

    _this.state = {
      messages: [{ type: 1, message: "Hey there you!" }, // Gray bubble
      { type: 1, message: "What have you been up to?" }],
      is_typing: false
    };
    return _this;
  }

  _createClass(Chat, [{
    key: '_pushMessage',
    value: function _pushMessage(recipient, message) {
      var prevState = this.state;
      prevState.messages.push({ type: recipient, message: message });
      this.setState(this.state);
    }
  }, {
    key: '_onMessageSubmit',
    value: function _onMessageSubmit(e) {
      var input = this.refs.message;
      e.preventDefault();
      if (!input.value) {
        return false;
      }
      this._pushMessage(0, input.value);
      input.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_lib.ChatFeed, {
          messages: this.state.messages // Boolean: list of message objects
          , isTyping: this.state.is_typing // Boolean: is the recipient typing
          , bubbleStyles: { // JSON: Custom bubble styles
            text: {
              fontSize: 18
            },
            chatbubble: {
              maxWidth: 600
            },
            userBubble: {
              backgroundColor: '#0084FF'
            }
          }
        }),
        _react2.default.createElement(
          'form',
          { onSubmit: this._onMessageSubmit.bind(this) },
          _react2.default.createElement('input', { ref: 'message', placeholder: 'Type a message...', className: 'message-input' })
        )
      );
    }
  }]);

  return Chat;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(Chat, null), document.getElementById('chat-ui'));
