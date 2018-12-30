import React from 'react';
import { List, Image, Search } from 'semantic-ui-react'
import './Contacts.css';

const ContactsView = ({
    isFetchingSearch, onSearchChange, searchResults, searchValue, users
}) => (
    <div className="Contacts">
        <div className="Header">
            <h1>GuppyChat</h1>
            <Search
                loading={isFetchingSearch}
                onSearchChange={onSearchChange}
                results={searchResults}
                value={searchValue}
            />
        </div>
        <List celled selection size="big">
            {Object.values(users).map(user => (
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

export default ContactsView;
