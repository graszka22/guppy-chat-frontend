import React from 'react';
import { List, Image, Message } from 'semantic-ui-react'
import './Contacts.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import FriendsSearch from '../FriendsSearch/FriendsSearch';

const ContactsView = ({
    users, onContactSelected,
}) => (
    <div className="Contacts">
        <div className="Header">
            <div className="Title">
                <h1>GuppyChat</h1>
                <div className="LogOutIcon">
                    <LogoutButton />
                </div>
            </div>
            <FriendsSearch />
        </div>
        {Object.values(users).length === 0 ? 
            (
                <Message>No contacts yet! Use the search above to add your friends!</Message>
            ) : 
            (
                <List celled selection size="big">
                    {Object.values(users).map(user => (
                        <List.Item key={user.username} onClick={() => onContactSelected(user.userId)}>
                            <Image avatar src={user.avatar} />
                            <List.Content>
                            <List.Header>{user.username}{user.activeNow && <span className="bullet"> •</span>}</List.Header>
                                <List.Description>{user.status}</List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            )
        }
    </div>
);

export default ContactsView;
