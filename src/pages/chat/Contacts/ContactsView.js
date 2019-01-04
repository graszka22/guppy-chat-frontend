import React from 'react';
import { List, Image, Search } from 'semantic-ui-react'
import './Contacts.css';
import LogoutButton from '../LogoutButton/LogoutButton';

const ContactsView = ({
    isFetchingSearch, onSearchChange, searchResults, searchValue, users, onContactSelected,
}) => (
    <div className="Contacts">
        <div className="Header">
            <div className="Title">
                <h1>GuppyChat</h1>
                <div className="LogOutIcon">
                    <LogoutButton />
                </div>
            </div>
            <Search
                loading={isFetchingSearch}
                onSearchChange={onSearchChange}
                results={searchResults}
                value={searchValue}
            />
        </div>
        <List celled selection size="big">
            {Object.values(users).map(user => (
                <List.Item onClick={() => onContactSelected(user.userId)}>
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
