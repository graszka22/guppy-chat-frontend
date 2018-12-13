import React, { Component } from 'react';
import { Input, List, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import './Contacts.css';

class Contacts extends Component {
    render() {
        return (
            <div className="Contacts">
                <div className="Header">
                    <h1>GuppyChat</h1>
                    <Input icon='search' placeholder='Search...' />
                </div>
                <List celled selection size="big">
                    {this.props.users.map(user => (
                        <List.Item>
                            <Image avatar src={user.avatar} />
                            <List.Content>
                    <List.Header>{user.name}{user.activeNow && <span className="bullet"> •</span>}</List.Header>
                                <List.Description>{user.status}</List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.friends,
    };
};

export default connect(mapStateToProps)(Contacts);