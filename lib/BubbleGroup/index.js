"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ChatBubble_1 = require("../ChatBubble");
var styles_1 = require("./styles");

var BubbleGroup = function (_React$Component) {
    _inherits(BubbleGroup, _React$Component);

    function BubbleGroup(props) {
        _classCallCheck(this, BubbleGroup);

        return _possibleConstructorReturn(this, (BubbleGroup.__proto__ || Object.getPrototypeOf(BubbleGroup)).call(this, props));
    }

    _createClass(BubbleGroup, [{
        key: "renderGroup",
        value: function renderGroup(messages, id) {
            var _props = this.props,
                bubblesCentered = _props.bubblesCentered,
                bubbleStyles = _props.bubbleStyles,
                showSenderName = _props.showSenderName,
                chatBubble = _props.chatBubble,
                senderName = _props.senderName;

            var ChatBubble = chatBubble || ChatBubble_1.default;
            var sampleMessage = messages[0];
            var messageNodes = messages.map(function (message, i) {
                return React.createElement(ChatBubble, { key: i, message: message, bubblesCentered: bubblesCentered, bubbleStyles: bubbleStyles });
            });
            return React.createElement("div", { style: styles_1.default.chatbubbleWrapper }, showSenderName && (senderName || sampleMessage.senderName) !== '' && sampleMessage.id !== 0 && React.createElement("h5", { style: styles_1.default.bubbleGroupHeader }, senderName || sampleMessage.senderName), messageNodes);
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                messages = _props2.messages,
                id = _props2.id;

            return this.renderGroup(messages, id);
        }
    }]);

    return BubbleGroup;
}(React.Component);

exports.default = BubbleGroup;
//# sourceMappingURL=index.js.map