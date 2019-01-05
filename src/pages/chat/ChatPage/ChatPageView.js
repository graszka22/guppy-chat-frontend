import React from 'react';
import './ChatPage.css';
import Contacts from '../Contacts/Contacts';
import ChatArea from '../ChatArea/ChatArea';

const ChatPageView = ({
    onContactSelected, currentUserId
}) => {
    return (
      <div className="ChatPage">
         <div className="ContactsContainer">
           <Contacts onContactSelected={onContactSelected}/>
        </div>
        { currentUserId &&
          <div className="ChatAreaContainer">
            <ChatArea friendId={currentUserId} />
          </div>
        }
      </div>
    );
};

export default ChatPageView;