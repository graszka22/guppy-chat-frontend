import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './Messages.css';

class Messages extends Component {
    render() {
        return (
            <div className="Messages">
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