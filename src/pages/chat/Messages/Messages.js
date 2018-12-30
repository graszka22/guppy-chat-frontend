import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIdSelector } from '../../../selectors';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidUpdate(prevProps) {
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
            <Messages
                messages={messages}
                userId={userId}
                ref={this.ref}
            />
        );
    }
};

const mapStateToProps = state => ({
    messages: state.messages,
    userId: userIdSelector(state),
});

export default connect(mapStateToProps)(Messages);