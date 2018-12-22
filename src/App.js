import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import ChatPage from './pages/chat/ChatPage';
import { actionCreator } from './reducers';

class App extends Component {
  constructor(props) {
    super(props);
    props.connectToWebsocket();
  }

  render() {
    return (
      <div className="App">
        {this.props.websocketConnected && <ChatPage />}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
