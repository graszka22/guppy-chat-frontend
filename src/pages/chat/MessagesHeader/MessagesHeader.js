import React from 'react';
import { Image } from 'semantic-ui-react';
import './MessagesHeader.css';

const MessagesHeader = ({ userName, userAvatar }) => (
    <div className="MessagesHeader">
        <Image circular src={userAvatar} size="mini" className="Avatar"/>
        <h2>{userName}</h2>
    </div>
);

export default MessagesHeader;