import React, { Component } from 'react';
import { Input, Divider, TextArea } from 'semantic-ui-react';
import './ChatArea.css';
import Messages from './Messages';
import MessagesHeader from './MessagesHeader';

class ChatArea extends Component {
    render() {
        const { userName, userAvatar } = this.props;
        return (
            <div className="ChatArea">
                <MessagesHeader userName={userName} userAvatar={userAvatar} />
                <Messages />
                <div className="MessageInput">
                    <TextArea transparent placeholder='Type a message...' autoHeight className="TextArea" />
                </div>
            </div>
        );
    }
}

export default ChatArea;