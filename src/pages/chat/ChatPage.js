import React, { Component } from 'react';
import './ChatPage.css';
import Contacts from './Contacts';
import ChatArea from './ChatArea';

class ChatPage extends Component {
  render() {
    return (
      <div className="ChatPage">
         <div className="ContactsContainer">
           <Contacts />
        </div>
        <div className="ChatAreaContainer">
          <ChatArea userName="Aldebrand Alayna" userAvatar="https://picsum.photos/100/100/?random" />
        </div>
      </div>
    );
  }
}

export default ChatPage;
