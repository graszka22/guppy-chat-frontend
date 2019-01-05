import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers';
import ContactsView from './ContactsView';

class Contacts extends Component {
    constructor(props) {
        super(props);
        props.fetchFriends();
    }

    render() {
        const { friendsLoaded, users, onContactSelected } = this.props;
        if(!friendsLoaded) return null;
        return (
            <ContactsView
                users={users}
                onContactSelected={onContactSelected}
            />
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