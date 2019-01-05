import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { actionCreator } from '../../../reducers';
import FriendsSearchView from './FriendsSearchView';
import './FriendsSearch.css';

class FriendsSearch extends React.Component {
    state = {
        searchValue: '',
        selectedUserId: null,
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ searchValue: value, selectedUserId: null })
        this.props.searchFriends(value);
    }

    onResultSelect = (e, {result: { title, userId }}) => {
        this.setState({ searchValue: title, selectedUserId: userId });
    }

    onAddButtonClick = () => {
        this.props.addFriend(this.state.selectedUserId);
    }

    render() {
        const { isFetchingSearch } = this.props;
        const { searchValue, selectedUserId } = this.state;
        const searchResults = this.props.searchResults.map(user => ({ title: user.username, userId: user.userId }));
        return (
            <FriendsSearchView
                isFetchingSearch={isFetchingSearch}
                searchValue={searchValue}
                searchResults={searchResults}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                onResultSelect={this.onResultSelect}
                addButtonVisible={selectedUserId !== null}
                onAddButtonClick={this.onAddButtonClick}
            />
        );
    }
}

const mapStateToProps = state => ({
    searchResults: state.searchFriends.results,
    isFetchingSearch: state.searchFriends.loading,
});

const mapDispatchToProps = dispatch => ({
    searchFriends: phrase => dispatch(actionCreator.searchFriends(phrase)),
    addFriend: friendId => dispatch(actionCreator.addFriend(friendId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsSearch);