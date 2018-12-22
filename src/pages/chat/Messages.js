import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './Messages.css';

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
                            const type = message.user === "me" ? "me" : "other";
                            return (
                                <div className={`Message ${type}`}>
                                    <Image src={message.avatar} avatar className="Avatar" />
                                    <p className={`MessageText ${type}`}>{message.content}</p>
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
});

export default connect(mapStateToProps)(Messages);