import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIdSelector, messagesSelector, isLoadingMessagesSelector } from '../../../selectors';
import MessagesView from './MessagesView';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if(this.ref && prevProps.messages !== this.props.messages)
            this.scrollToBottom();
    }

    scrollToBottom = () => {
        const messages = this.ref.current;
        const scrollHeight = messages.scrollHeight;
        messages.scrollTop = scrollHeight;
    }

    render() {
        const { messages, userId } = this.props;
        return (
            <MessagesView
                messages={messages}
                userId={userId}
                messagesRef={this.ref}
            />
        );
    }
};

const mapStateToProps = (state, props) => ({
    messages: messagesSelector(state, props.friendId),
    loading: isLoadingMessagesSelector(state, props.friendId),
    userId: userIdSelector(state),
});

export default connect(mapStateToProps)(Messages);