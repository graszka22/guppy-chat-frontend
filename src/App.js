import React from 'react';
import ChatPage from './pages/chat/ChatPage';
import LoginPage from './pages/login/LoginPage';
import { createSwitchNavigator } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";

const Navigator = createSwitchNavigator({
  Login: LoginPage,
  Chat: ChatPage,
});

export default createBrowserApp(Navigator);