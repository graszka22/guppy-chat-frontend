import React from 'react';
import { Image, Loader } from 'semantic-ui-react';
import './Messages.css';

const MessagesView = ({
    messagesRef, messages, userId, loading, onScroll
}) => (
    <div className="Messages" ref={messagesRef} onScroll={onScroll}>
        <Loader active={loading} />
        {
            messages.map(message => {
                    const type = message.senderId === userId ? "me" : "other";
                    return (
                        <div className={`Message ${type}`} key={message.id}>
                            <Image src={message.avatar} avatar className="Avatar" />
                            <p className={`MessageText ${type}`}>{message.text}</p>
                        </div>
                    );
                }
            )
        }
    </div>
);

export default MessagesView;