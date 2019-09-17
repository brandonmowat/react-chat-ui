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
var styles_1 = require("./styles");
var defaultBubbleStyles = {
    userBubble: {},
    chatbubble: {},
    text: {},
};
var ChatBubble = (function (_super) {
    __extends(ChatBubble, _super);
    function ChatBubble(props) {
        return _super.call(this, props) || this;
    }
    ChatBubble.prototype.render = function () {
        var bubblesCentered = this.props.bubblesCentered;
        var bubbleStyles = this.props.bubbleStyles;
        bubbleStyles = bubbleStyles || defaultBubbleStyles;
        var userBubble = bubbleStyles.userBubble, chatbubble = bubbleStyles.chatbubble, text = bubbleStyles.text;
        var chatBubbleStyles = this.props.message.id === 0
            ? __assign(__assign(__assign(__assign({}, styles_1.default.chatbubble), bubblesCentered ? {} : styles_1.default.chatbubbleOrientationNormal), chatbubble), userBubble) : __assign(__assign(__assign(__assign(__assign({}, styles_1.default.chatbubble), styles_1.default.recipientChatbubble), bubblesCentered
            ? {}
            : styles_1.default.recipientChatbubbleOrientationNormal), chatbubble), userBubble);
        return (React.createElement("div", { style: __assign({}, styles_1.default.chatbubbleWrapper) },
            React.createElement("div", { style: chatBubbleStyles },
                React.createElement("p", { style: __assign(__assign({}, styles_1.default.p), text) }, this.props.message.message))));
    };
    return ChatBubble;
}(React.Component));
exports.default = ChatBubble;
//# sourceMappingURL=index.js.map