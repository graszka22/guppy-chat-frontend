import React from 'react';
import { Search, Icon } from 'semantic-ui-react';

const FriendsSearchView = ({
    isFetchingSearch, onSearchChange, searchResults, searchValue, onResultSelect,
    addButtonVisible, onAddButtonClick,
}) => (
    <div className="FriendsSearch">
        <Search
            loading={isFetchingSearch}
            onSearchChange={onSearchChange}
            results={searchResults}
            value={searchValue}
            onResultSelect={onResultSelect}
        />
        <Icon name="plus" link size="big" onClick={onAddButtonClick} className={addButtonVisible ? "" : "hidden"}/>
    </div>
);

export default FriendsSearchView;