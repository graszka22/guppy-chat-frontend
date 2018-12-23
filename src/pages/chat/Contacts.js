import React, { Component } from 'react';
import { Input, List, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import './Contacts.css';
import { actionCreator } from '../../reducers';

class Contacts extends Component {
    constructor(props) {
        super(props);
        props.fetchFriends();
    }

    render() {
        if(!this.props.friendsLoaded) return null;
        return (
            <div className="Contacts">
                <div className="Header">
                    <h1>GuppyChat</h1>
                    <Input icon='search' placeholder='Search...' />
                </div>
                <List celled selection size="big">
                    {Object.values(this.props.users).map(user => (
                        <List.Item onClick={() => this.props.onContactSelected(user.userId)}>
                            <Image avatar src={user.avatar} />
                            <List.Content>
                    <List.Header>{user.username}{user.activeNow && <span className="bullet"> •</span>}</List.Header>
                                <List.Description>{user.status}</List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.friends,
    friendsLoaded: state.friendsLoaded,
});

const mapDispatchToProps = dispatch => ({
    fetchFriends: () => dispatch(actionCreator.fetchFriends()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);