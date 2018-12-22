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
        <ChatPage />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  connectToWebsocket: () => dispatch(actionCreator.connectToWebsocket()),
});

export default connect(null, mapDispatchToProps)(App);
