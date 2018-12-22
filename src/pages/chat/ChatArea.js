import React, { Component } from 'react';
import { TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './ChatArea.css';
import Messages from './Messages';
import MessagesHeader from './MessagesHeader';
import { actionCreator } from '../../reducers';

class ChatArea extends Component {
    state = {
        message: "",
    };

    constructor(props) {
        super(props);
        props.getMessages();
    }

    onChange = (ev, data) => {
        this.setState({ message: data.value })
    }

    onKeyUp = (ev) => {
        if (ev.keyCode === 13 && !ev.shiftKey) {
            this.props.sendMessage(this.state.message);
            this.setState({ message: "" });
        }
    }

    render() {
        const { userName, userAvatar } = this.props;
        return (
            <div className="ChatArea">
                <MessagesHeader userName={userName} userAvatar={userAvatar} />
                <Messages />
                <div className="MessageInput">
                    <TextArea
                        transparent
                        placeholder='Type a message...'
                        autoHeight
                        className="TextArea"
                        onChange={this.onChange}
                        onKeyUp={this.onKeyUp}
                        value={this.state.message}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    sendMessage: (message) => dispatch(actionCreator.sendMessage(message)),
    getMessages: () => dispatch(actionCreator.getMessages()),
});

export default connect(null, mapDispatchToProps)(ChatArea);