import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers';
import { getUserDataById } from '../../../selectors';
import ChatAreaView from './ChatAreaView';

class ChatArea extends Component {
    state = {
        message: "",
    };

    constructor(props) {
        super(props);
        props.getMessages(props.userId);
    }

    onMessageChange = (ev, data) => {
        this.setState({ message: data.value })
    }

    onMessageKeyUp = (ev) => {
        if (ev.keyCode === 13 && !ev.shiftKey) {
            this.props.sendMessage(this.state.message, this.props.userId);
            this.setState({ message: "" });
        }
    }

    render() {
        const { friend, friendsLoaded } = this.props;
        const { message } = this.state;
        if(!friendsLoaded) return null;
        return (
            <ChatAreaView
                friendsLoaded={friendsLoaded}
                friendUsername={friend.username}
                onMessageChange={this.onMessageChange}
                onMessageKeyUp={this.onMessageKeyUp}
                messageValue={message}
            />
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