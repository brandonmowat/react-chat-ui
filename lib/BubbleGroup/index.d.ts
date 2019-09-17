import * as React from 'react';
import BubbleGroupInterface from './interface';
import Message from '../Message';
export default class BubbleGroup extends React.Component {
    props: any;
    constructor(props: BubbleGroupInterface);
    renderGroup(messages: [Message], id: number): JSX.Element;
    render(): JSX.Element;
}
