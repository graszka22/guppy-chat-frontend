import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'
import { actionCreator } from '../../../reducers';
import { userIdSelector, messagesSelector, isLoadingMessagesSelector } from '../../../selectors';
import MessagesView from './MessagesView';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        props.getMessages(props.friendId);
    }

    componentWillUpdate(nextProps) {
        if (!this.ref) return;
        if (nextProps.messages !== this.props.messages) {
            this.historyChanged = true;
            if (this.props.messages.length === 0 || this.isAtBottom()) {
                this.shouldScrollToBottom = true;
                return;
            }
            this.shouldScrollToBottom = false;
        } else {
            this.historyChanged = false;
        }
    }

    componentDidUpdate() {
        if(!this.historyChanged) return;
        if(this.shouldScrollToBottom)
            this.scrollToBottom();
        else
            ReactDOM.findDOMNode(this.ref.current.childNodes[10]).scrollIntoView();
    }

    isAtBottom = () => {
        const messages = this.ref.current;
        return messages.scrollHeight === messages.scrollTop + messages.clientHeight;
    }

    scrollToBottom = () => {
        const messages = this.ref.current;
        const scrollHeight = messages.scrollHeight;
        messages.scrollTop = scrollHeight;
    }

    onScroll = () => {
        if (this.ref.current.scrollTop === 0) {
            this.props.getMessages(this.props.friendId);
        }
    }

    render() {
        const { messages, userId, loading } = this.props;
        return (
            <MessagesView
                loading={loading}
                messages={messages}
                userId={userId}
                messagesRef={this.ref}
                onScroll={this.onScroll}
            />
        );
    }
};

const mapStateToProps = (state, props) => ({
    messages: messagesSelector(state, props.friendId),
    loading: isLoadingMessagesSelector(state, props.friendId),
    userId: userIdSelector(state),
});

const mapDispatchToProps = dispatch => ({
    getMessages: (friendId) => dispatch(actionCreator.getMessages(friendId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);