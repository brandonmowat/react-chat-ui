import * as React from 'react';
import Message from '../Message';
interface ChatFeedInterface {
    props: {
        bubblesCentered?: boolean;
        bubbleStyles?: object;
        hasInputField?: boolean;
        isTyping?: boolean;
        maxHeight?: number;
        messages: any;
        showSenderName?: boolean;
        chatBubble?: React.Component;
        preventConflictingAutoScroll?: boolean;
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
    };
    _hasUserScrolledUp: boolean;
    constructor(props: ChatFeedInterface);
    componentDidMount(): void;
    componentDidUpdate(): void;
    private getMaxScrollTop;
    scrollToBottom(): void;
    componentWillUnmount(): void;
    private handleScrollEvent;
    renderMessages(messages: [Message]): JSX.Element[];
    render(): JSX.Element;
}
export {};
