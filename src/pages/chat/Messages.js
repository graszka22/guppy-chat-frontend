import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './Messages.css';
import { userIdSelector } from '../../selectors';

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
        return (
            <div className="Messages" ref={this.ref}>
                {
                    this.props.messages.map(message => {
                            const type = message.senderId === this.props.userId ? "me" : "other";
                            return (
                                <div className={`Message ${type}`}>
                                    <Image src={message.avatar} avatar className="Avatar" />
                                    <p className={`MessageText ${type}`}>{message.text}</p>
                                </div>
                            );
                        }
                    )
                }
            </div>
        );
    }
};

const mapStateToProps = state => ({
    messages: state.messages,
    userId: userIdSelector(state),
});

export default connect(mapStateToProps)(Messages);