import React from 'react';
import ChatPage from './pages/chat/ChatPage/ChatPage';
import LoginPage from './pages/login/LoginPage';
import { createSwitchNavigator } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";
import { setNavigator } from './Navigation';

const Navigator = createSwitchNavigator({
  Login: LoginPage,
  Chat: ChatPage,
});

const AppWithNav = createBrowserApp(Navigator);

class App extends React.PureComponent {
  render() {
    return (
      <AppWithNav ref={ref => setNavigator(ref._navigation)}/>
    );
  }
}

export default App;