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
  websocketConnected: state.connected,
})

const mapDispatchToProps = dispatch => ({
  connectToWebsocket: () => dispatch(actionCreator.connectToWebsocket()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
