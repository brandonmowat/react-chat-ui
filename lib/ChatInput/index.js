"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styles = {
    chatInput: {
        flex: 1,
    },
    inputStyle: {
        border: 'none',
        borderTopWidth: '1',
        borderTopStyle: 'solid',
        borderTopColor: '#ddd',
        fontSize: '16',
        outline: 'none',
        padding: '30',
        width: '100%',
    },
};
var ChatInput = function (props) {
    var inputStyles = props.inputStyles, inputPlaceholder = props.inputPlaceholder;
    return (react_1.default.createElement("div", { className: "chat-input", style: styles.chatInput },
        react_1.default.createElement("input", { type: "text", style: inputStyles || styles.inputStyle, placeholder: inputPlaceholder })));
};
exports.default = ChatInput;
//# sourceMappingURL=index.js.map