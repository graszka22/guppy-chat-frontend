import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers';
import { getUserDataById } from '../../../selectors';
import ChatAreaView from './ChatAreaView';

class ChatArea extends Component {
    state = {
        message: "",
    };

    onMessageChange = (ev, data) => {
        this.setState({ message: data.value })
    }

    onMessageKeyUp = (ev) => {
        if (ev.keyCode === 13 && !ev.shiftKey) {
            this.props.sendMessage(this.state.message, this.props.friendId);
            this.setState({ message: "" });
        }
    }

    render() {
        const { friend, friendsLoaded, friendId } = this.props;
        const { message } = this.state;
        if(!friendsLoaded) return null;
        return (
            <ChatAreaView
                friendsLoaded={friendsLoaded}
                friendUsername={friend.username}
                onMessageChange={this.onMessageChange}
                onMessageKeyUp={this.onMessageKeyUp}
                messageValue={message}
                friendId={friendId}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    return ({
        friend: getUserDataById(state, props.friendId),
        friendsLoaded: state.friendsLoaded,
    });
}

const mapDispatchToProps = dispatch => ({
    sendMessage: (message, receiverId) => dispatch(actionCreator.sendMessage(message, receiverId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);