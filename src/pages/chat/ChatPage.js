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

  state = {
    currentUserId: null,
  }

  onContactSelected = userId => this.setState({ currentUserId: userId });

  render() {
    if(!this.props.websocketConnected) return null;
    return (
      <div className="ChatPage">
         <div className="ContactsContainer">
           <Contacts onContactSelected={this.onContactSelected}/>
        </div>
        { this.state.currentUserId &&
          <div className="ChatAreaContainer">
            <ChatArea userId={this.state.currentUserId} />
          </div>
        }
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
