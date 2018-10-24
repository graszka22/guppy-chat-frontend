import React, { Component } from 'react';
import { Input, List, Image } from 'semantic-ui-react'
import './Contacts.css';

const users = [
    {
        name: 'Aldebrand Alayna',
        status: 'Active now',
        activeNow: true,
        avatar: 'https://picsum.photos/100/100/?random',
    },
    {
        name: 'Margarit Corrine',
        status: 'Active 6h ago',
        activeNow: false,
        avatar: 'https://picsum.photos/100/100/?random',
    },
    {
        name: 'Klavdiya Margrét',
        status: 'Active 20 minutes ago',
        activeNow: false,
        avatar: 'https://picsum.photos/100/100/?random',
    },
    {
        name: 'Klara Felix',
        status: 'Active now',
        activeNow: true,
        avatar: 'https://picsum.photos/100/100/?random',
    }
]

class Contacts extends Component {
    render() {
        return (
            <div className="Contacts">
                <div className="Header">
                    <h1>GuppyChat</h1>
                    <Input icon='search' placeholder='Search...' />
                </div>
                <List celled selection size="big">
                    {users.map(user => (
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

export default Contacts;