"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var BubbleGroup_1 = require("../BubbleGroup");
var ChatBubble_1 = require("../ChatBubble");
var ChatInput_1 = require("../ChatInput");
var Message_1 = require("../Message");
var styles_1 = require("./styles");
var ChatFeed = (function (_super) {
    __extends(ChatFeed, _super);
    function ChatFeed(props) {
        var _this = _super.call(this, props) || this;
        _this._hasUserScrolledUp = false;
        _this.handleScrollEvent = _this.handleScrollEvent.bind(_this);
        return _this;
    }
    ChatFeed.prototype.componentDidMount = function () {
        this.scrollToBottom();
        this.chat.addEventListener('scroll', this.handleScrollEvent);
    };
    ChatFeed.prototype.componentDidUpdate = function () {
        var preventConflictingAutoScroll = this.props.preventConflictingAutoScroll;
        if (preventConflictingAutoScroll && this._hasUserScrolledUp) {
            return;
        }
        this.scrollToBottom();
    };
    ChatFeed.prototype.getMaxScrollTop = function () {
        if (!this.chat)
            return 0;
        var scrollHeight = this.chat.scrollHeight;
        var height = this.chat.clientHeight;
        return scrollHeight - height;
    };
    ChatFeed.prototype.scrollToBottom = function () {
        var maxScrollTop = this.getMaxScrollTop();
        this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };
    ChatFeed.prototype.componentWillUnmount = function () {
        this.chat.removeEventListener('scroll', this.handleScrollEvent);
    };
    ChatFeed.prototype.handleScrollEvent = function (event) {
        if (!this.chat)
            return;
        var maxScrollTop = this.getMaxScrollTop();
        if (this.chat.scrollTop < maxScrollTop - ChatFeed.MANUAL_SCROLL_BOTTOM_MARGIN) {
            this._hasUserScrolledUp = true;
        }
        else {
            this._hasUserScrolledUp = false;
        }
    };
    ChatFeed.prototype.renderMessages = function (messages) {
        var _a = this.props, isTyping = _a.isTyping, bubbleStyles = _a.bubbleStyles, chatBubble = _a.chatBubble, showSenderName = _a.showSenderName;
        var ChatBubble = chatBubble || ChatBubble_1.default;
        var group = [];
        var messageNodes = messages.map(function (message, index) {
            group.push(message);
            if (index === messages.length - 1 || messages[index + 1].id !== message.id) {
                var messageGroup = group;
                group = [];
                return (React.createElement(BubbleGroup_1.default, { key: index, messages: messageGroup, id: message.id, showSenderName: showSenderName, chatBubble: ChatBubble, bubbleStyles: bubbleStyles }));
            }
            return null;
        });
        if (isTyping) {
            messageNodes.push(React.createElement("div", { key: "isTyping", style: __assign({}, styles_1.default.chatbubbleWrapper) },
                React.createElement(ChatBubble, { message: new Message_1.default({ id: 1, message: '...', senderName: '' }), bubbleStyles: bubbleStyles })));
        }
        return messageNodes;
    };
    ChatFeed.prototype.render = function () {
        var _this = this;
        var inputField = this.props.hasInputField && React.createElement(ChatInput_1.default, null);
        var maxHeight = this.props.maxHeight;
        return (React.createElement("div", { id: "chat-panel", style: styles_1.default.chatPanel },
            React.createElement("div", { ref: function (c) {
                    _this.chat = c;
                }, className: "chat-history", style: __assign(__assign({}, styles_1.default.chatHistory), { maxHeight: maxHeight }) },
                React.createElement("div", { className: "chat-messages" }, this.renderMessages(this.props.messages))),
            inputField));
    };
    ChatFeed.defaultProps = {
        preventConflictingAutoScroll: true,
    };
    ChatFeed.MANUAL_SCROLL_BOTTOM_MARGIN = 20;
    return ChatFeed;
}(React.Component));
exports.default = ChatFeed;
//# sourceMappingURL=index.js.map