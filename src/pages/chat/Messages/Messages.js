import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIdSelector } from '../../../selectors';
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

const mapStateToProps = state => ({
    messages: state.messages,
    userId: userIdSelector(state),
});

export default connect(mapStateToProps)(Messages);