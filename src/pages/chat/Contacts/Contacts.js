import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { actionCreator } from '../../../reducers';
import ContactsView from './ContactsView';

class Contacts extends Component {
    constructor(props) {
        super(props);
        props.fetchFriends();
    }

    state = {
        searchValue: '',
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ searchValue: value })
        this.props.searchFriends(value);
    }

    render() {
        const { friendsLoaded, isFetchingSearch, users } = this.props;
        const { searchValue } = this.state;
        const searchResults = this.props.searchResults.map(username => ({ title: username }));
        if(!friendsLoaded) return null;
        return (
            <ContactsView
                isFetchingSearch={isFetchingSearch}
                users={users}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                searchValue={searchValue}
                searchResults={searchResults}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.friends,
    friendsLoaded: state.friendsLoaded,
    searchResults: state.searchFriends.results,
    isFetchingSearch: state.searchFriends.loading,
});

const mapDispatchToProps = dispatch => ({
    fetchFriends: () => dispatch(actionCreator.fetchFriends()),
    searchFriends: phrase => dispatch(actionCreator.searchFriends(phrase)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);