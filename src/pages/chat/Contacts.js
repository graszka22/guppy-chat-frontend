import React, { Component } from 'react';
import { List, Image, Search } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as _ from 'lodash';
import './Contacts.css';
import { actionCreator } from '../../reducers';

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
        const searchResults = this.props.searchResults.map(username => ({ title: username }));
        if(!this.props.friendsLoaded) return null;
        return (
            <div className="Contacts">
                <div className="Header">
                    <h1>GuppyChat</h1>
                    <Search
                        loading={this.props.isFetchingSearch}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                        results={searchResults}
                        value={this.state.searchValue}
                    />
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
    searchResults: state.searchFriends.results,
    isFetchingSearch: state.searchFriends.loading,
});

const mapDispatchToProps = dispatch => ({
    fetchFriends: () => dispatch(actionCreator.fetchFriends()),
    searchFriends: phrase => dispatch(actionCreator.searchFriends(phrase)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);