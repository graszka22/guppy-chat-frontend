import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ChatPage.css';
import Contacts from './Contacts';
import ChatArea from './ChatArea';
import { actionCreator } from '../../reducers';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    props.connectToWebsocket();
  }

  render() {
    if(!this.props.websocketConnected) return null;
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

const mapStateToProps = state => ({
  websocketConnected: state.connected,
})

const mapDispatchToProps = dispatch => ({
  connectToWebsocket: () => dispatch(actionCreator.connectToWebsocket()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
