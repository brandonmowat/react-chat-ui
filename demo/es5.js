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

var Chat = function (_React$Component) {
  _inherits(Chat, _React$Component);

  function Chat() {
    _classCallCheck(this, Chat);

    var _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this));

    _this.state = {
      messages: [new _lib.Message({ id: 1, message: "Hey guys!" }), new _lib.Message({ id: 2, message: "Hey! Evan here. react-chat-ui is pretty dooope." })],
      curr_user: 0
    };
    return _this;
  }

  _createClass(Chat, [{
    key: '_onPress',
    value: function _onPress(user) {
      this.setState({ curr_user: user });
    }
  }, {
    key: '_pushMessage',
    value: function _pushMessage(recipient, message) {
      var prevState = this.state;
      prevState.messages.push(new _lib.Message({ id: recipient, message: message }));
      this.setState(this.state);
    }
  }, {
    key: '_onMessageSubmit',
    value: function _onMessageSubmit(e) {
      var input = this.refs.message;
      e.preventDefault();
      console.log("submit!");
      if (!input.value) {
        return false;
      }
      this._pushMessage(this.state.curr_user, input.value);
      input.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.state.messages);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_lib.ChatFeed, {
          messages: this.state.messages // Boolean: list of message objects
          , isTyping: false // Boolean: is the recipient typing
          , hasInputField: false // Boolean: use our input, or use your own
          , bubblesCentered: false //Boolean should the bubbles be centered in the feed?
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
        ),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'space-around' } },
          _react2.default.createElement(
            'button',
            { style: _extends({}, styles.button, this.state.curr_user === 0 ? styles.selected : {}), onClick: this._onPress.bind(this, 0) },
            'You'
          ),
          _react2.default.createElement(
            'button',
            { style: _extends({}, styles.button, this.state.curr_user === 1 ? styles.selected : {}), onClick: this._onPress.bind(this, 1) },
            'Mark'
          ),
          _react2.default.createElement(
            'button',
            { style: _extends({}, styles.button, this.state.curr_user === 2 ? styles.selected : {}), onClick: this._onPress.bind(this, 2) },
            'Evan'
          )
        )
      );
    }
  }]);

  return Chat;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(Chat, null), document.getElementById('chat-ui'));
