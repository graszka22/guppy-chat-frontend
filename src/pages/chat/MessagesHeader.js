import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import './MessagesHeader.css';

class MessagesHeader extends Component {
    render() {
        const { userName, userAvatar } = this.props;
        return (
            <div className="MessagesHeader">
                <Image circular src={userAvatar} size="mini" className="Avatar"/>
                <h2>{userName}</h2>
            </div>
        );
    }
};

export default MessagesHeader;