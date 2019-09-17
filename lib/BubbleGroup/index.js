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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ChatBubble_1 = require("../ChatBubble");
var styles_1 = require("./styles");
var BubbleGroup = (function (_super) {
    __extends(BubbleGroup, _super);
    function BubbleGroup(props) {
        return _super.call(this, props) || this;
    }
    BubbleGroup.prototype.renderGroup = function (messages, id) {
        var _a = this.props, bubblesCentered = _a.bubblesCentered, bubbleStyles = _a.bubbleStyles, showSenderName = _a.showSenderName, chatBubble = _a.chatBubble, senderName = _a.senderName;
        var ChatBubble = chatBubble || ChatBubble_1.default;
        var sampleMessage = messages[0];
        var messageNodes = messages.map(function (message, i) {
            return (React.createElement(ChatBubble, { key: i, message: message, bubblesCentered: bubblesCentered, bubbleStyles: bubbleStyles }));
        });
        return (React.createElement("div", { style: styles_1.default.chatbubbleWrapper },
            showSenderName &&
                ((senderName || sampleMessage.senderName) !== '' &&
                    (sampleMessage.id !== 0 && (React.createElement("h5", { style: styles_1.default.bubbleGroupHeader }, senderName || sampleMessage.senderName)))),
            messageNodes));
    };
    BubbleGroup.prototype.render = function () {
        var _a = this.props, messages = _a.messages, id = _a.id;
        return this.renderGroup(messages, id);
    };
    return BubbleGroup;
}(React.Component));
exports.default = BubbleGroup;
//# sourceMappingURL=index.js.map