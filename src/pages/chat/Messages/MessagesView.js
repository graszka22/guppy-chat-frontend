import React from 'react';
import { Image } from 'semantic-ui-react';
import './Messages.css';

const MessagesView = ({
    ref, messages, userId,
}) => (
    <div className="Messages" ref={ref}>
        {
            messages.map(message => {
                    const type = message.senderId === userId ? "me" : "other";
                    return (
                        <div className={`Message ${type}`}>
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