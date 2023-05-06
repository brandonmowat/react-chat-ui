import * as React from "react";
import Message from "../Message";
interface ChatFeedInterface {
    props: {
        bubblesCentered?: boolean;
        bubbleStyles?: object;
        chatBubble?: React.Component;
        hasInputField?: boolean;
        isTyping?: boolean;
        maxHeight?: number;
        messages: any;
        preventConflictingAutoScroll?: boolean;
        showSenderName?: boolean;
    };
}
export default class ChatFeed extends React.Component<ChatFeedInterface> {
    static defaultProps: {
        preventConflictingAutoScroll: boolean;
    };
    static MANUAL_SCROLL_BOTTOM_MARGIN: number;
    props: any;
    chat: {
        scrollHeight: number;
        clientHeight: number;
        scrollTop: number;
        addEventListener: Function;
        removeEventListener: Function;
        querySelectorAll: Function;
    };
    _hasUserScrolledUp: boolean;
    _scrollOnLoadChatLogId: string;
    _scrollOnLoadClassName: string;
    constructor(props: ChatFeedInterface);
    componentDidMount(): void;
    componentDidUpdate(): void;
    private getMaxScrollTop;
    scrollToBottom(): void;
    componentWillUnmount(): void;
    private handleScrollEvent;
    scrollToChatLogId(chatLogId: string, className?: string): void;
    renderMessages(messages: [Message]): JSX.Element;
    render(): JSX.Element;
}
export {};
