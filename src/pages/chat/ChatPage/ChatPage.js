import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers';
import ChatPageView from './ChatPageView';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    props.connectToWebsocket();
  }

  state = {
    currentUserId: null,
  }

  onContactSelected = userId => this.setState({ currentUserId: userId });

  componentDidUpdate = () => {
    const users = Object.keys(this.props.users);
    if(this.state.currentUserId === null && users.length) {
      this.setState({ currentUserId: users[0]})
    }
  }

  render() {
    const { websocketConnected } = this.props;
    const { currentUserId } = this.state;
    if(!websocketConnected) return null;
    return (
      <ChatPageView
        onContactSelected={this.onContactSelected}
        currentUserId={currentUserId}
      />
    );
  }
}

const mapStateToProps = state => ({
  users: state.friends,
  websocketConnected: state.connected,
})

const mapDispatchToProps = dispatch => ({
  connectToWebsocket: () => dispatch(actionCreator.connectToWebsocket()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
