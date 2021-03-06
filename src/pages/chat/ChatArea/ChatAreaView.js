import React from 'react';
import { TextArea } from 'semantic-ui-react';
import './ChatArea.css';
import Messages from '../Messages/Messages';
import MessagesHeader from '../MessagesHeader/MessagesHeader';

const ChatAreaView = ({
    friendUsername, onMessageChange, onMessageKeyUp, messageValue, friendId,
}) => (
    <div className="ChatArea">
        <MessagesHeader userName={friendUsername} />
        <Messages friendId={friendId} />
        <div className="MessageInput">
            <TextArea
                placeholder='Type a message...'
                autoHeight
                className="TextArea"
                onChange={onMessageChange}
                onKeyUp={onMessageKeyUp}
                value={messageValue}
            />
        </div>
    </div>
);

export default ChatAreaView;