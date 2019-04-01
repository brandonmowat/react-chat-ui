"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("./styles");
var defaultBubbleStyles = {
    userBubble: {},
    chatbubble: {},
    text: {}
};

var ChatBubble = function (_React$Component) {
    _inherits(ChatBubble, _React$Component);

    function ChatBubble(props) {
        _classCallCheck(this, ChatBubble);

        return _possibleConstructorReturn(this, (ChatBubble.__proto__ || Object.getPrototypeOf(ChatBubble)).call(this, props));
    }

    _createClass(ChatBubble, [{
        key: "render",
        value: function render() {
            var bubblesCentered = this.props.bubblesCentered;
            var bubbleStyles = this.props.bubbleStyles;

            bubbleStyles = bubbleStyles || defaultBubbleStyles;
            var _bubbleStyles = bubbleStyles,
                userBubble = _bubbleStyles.userBubble,
                chatbubble = _bubbleStyles.chatbubble,
                text = _bubbleStyles.text;

            var chatBubbleStyles = this.props.message.id === 0 ? Object.assign({}, styles_1.default.chatbubble, bubblesCentered ? {} : styles_1.default.chatbubbleOrientationNormal, chatbubble, userBubble) : Object.assign({}, styles_1.default.chatbubble, styles_1.default.recipientChatbubble, bubblesCentered ? {} : styles_1.default.recipientChatbubbleOrientationNormal, userBubble, chatbubble);
            return React.createElement("div", { style: Object.assign({}, styles_1.default.chatbubbleWrapper) }, React.createElement("div", { style: chatBubbleStyles }, React.createElement("p", { style: Object.assign({}, styles_1.default.p, text) }, this.props.message.message)));
        }
    }]);

    return ChatBubble;
}(React.Component);

exports.default = ChatBubble;
//# sourceMappingURL=index.js.map