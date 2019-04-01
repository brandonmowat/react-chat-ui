"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var BubbleGroup_1 = require("../BubbleGroup");
var ChatBubble_1 = require("../ChatBubble");
var ChatInput_1 = require("../ChatInput");
var Message_1 = require("../Message");
var styles_1 = require("./styles");

var ChatFeed = function (_React$Component) {
    _inherits(ChatFeed, _React$Component);

    function ChatFeed(props) {
        _classCallCheck(this, ChatFeed);

        return _possibleConstructorReturn(this, (ChatFeed.__proto__ || Object.getPrototypeOf(ChatFeed)).call(this, props));
    }

    _createClass(ChatFeed, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.scrollToBottom();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.scrollToBottom();
        }
    }, {
        key: "scrollToBottom",
        value: function scrollToBottom() {
            var scrollHeight = this.chat.scrollHeight;
            var height = this.chat.clientHeight;
            var maxScrollTop = scrollHeight - height;
            this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }, {
        key: "renderMessages",
        value: function renderMessages(messages) {
            var _props = this.props,
                isTyping = _props.isTyping,
                bubbleStyles = _props.bubbleStyles,
                chatBubble = _props.chatBubble,
                showSenderName = _props.showSenderName;

            var ChatBubble = chatBubble || ChatBubble_1.default;
            var group = [];
            var messageNodes = messages.map(function (message, index) {
                group.push(message);
                if (!messages[index + 1] || messages[index + 1].id !== message.id) {
                    var messageGroup = group;
                    group = [];
                    return React.createElement(BubbleGroup_1.default, { key: index, messages: messageGroup, id: message.id, showSenderName: showSenderName, chatBubble: ChatBubble, bubbleStyles: bubbleStyles });
                }
                return null;
            });
            if (isTyping) {
                messageNodes.push(React.createElement("div", { key: "isTyping", style: Object.assign({}, styles_1.default.chatbubbleWrapper) }, React.createElement(ChatBubble, { message: new Message_1.default({ id: 1, message: '...', senderName: '' }), bubbleStyles: bubbleStyles })));
            }
            return messageNodes;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var inputField = this.props.hasInputField && React.createElement(ChatInput_1.default, null);
            var maxHeight = this.props.maxHeight;

            return React.createElement("div", { id: "chat-panel", style: styles_1.default.chatPanel }, React.createElement("div", { ref: function ref(c) {
                    _this2.chat = c;
                }, className: "chat-history", style: Object.assign({}, styles_1.default.chatHistory, { maxHeight: maxHeight }) }, React.createElement("div", { className: "chat-messages" }, this.renderMessages(this.props.messages))), inputField);
        }
    }]);

    return ChatFeed;
}(React.Component);

exports.default = ChatFeed;
//# sourceMappingURL=index.js.map