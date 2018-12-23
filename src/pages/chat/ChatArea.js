import React, { Component } from 'react';
import { TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './ChatArea.css';
import Messages from './Messages';
import MessagesHeader from './MessagesHeader';
import { actionCreator } from '../../reducers';
import { getUserDataById } from '../../selectors';
class ChatArea extends Component {
    state = {
        message: "",
    };

    constructor(props) {
        super(props);
        props.getMessages(props.userId);
    }

    onChange = (ev, data) => {
        this.setState({ message: data.value })
    }

    onKeyUp = (ev) => {
        if (ev.keyCode === 13 && !ev.shiftKey) {
            this.props.sendMessage(this.state.message, this.props.userId);
            this.setState({ message: "" });
        }
    }

    render() {
        const { friend, friendsLoaded } = this.props;
        if(!friendsLoaded) return null;
        return (
            <div className="ChatArea">
                <MessagesHeader userName={friend.username} />
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

const mapStateToProps = (state, props) => {
    return ({
        friend: getUserDataById(state, props.userId),
        friendsLoaded: state.friendsLoaded,
    });
}

const mapDispatchToProps = dispatch => ({
    sendMessage: (message, receiverId) => dispatch(actionCreator.sendMessage(message, receiverId)),
    getMessages: (friendId) => dispatch(actionCreator.getMessages(friendId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);