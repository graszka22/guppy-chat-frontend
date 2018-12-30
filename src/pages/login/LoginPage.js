import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers';
import LoginPageView from './LoginPageView';

class LoginPage extends Component {
  state = {
    loginUsername: "", 
    loginPassword: "",
    registerUsername: "",
    registerEmail: "",
    registerPassword: "",
    registerRepeatPassword: "",
  };

  componentDidUpdate(prevProps) {
    if(!prevProps.userToken && this.props.userToken) {
      this.props.navigation.navigate('Chat');
    }
  }

  onLoginUsernameChange = (ev, data) => {
    this.setState({
      loginUsername: data.value,
    });
  }

  onLoginPasswordChange = (ev, data) => {
    this.setState({
      loginPassword: data.value,
    });
  }

  onRegisterUsernameChange = (ev, data) => this.setState({ registerUsername: data.value });

  onRegisterEmailChange = (ev, data) => this.setState({ registerEmail: data.value });

  onRegisterPasswordChange = (ev, data) => this.setState({ registerPassword: data.value });

  onRegisterRepeatPasswordChange = (ev, data) => this.setState({ registerRepeatPassword: data.value });

  onLoginClick = () => {
    const { loginUsername, loginPassword } = this.state;
    this.props.login(loginUsername, loginPassword);
  }

  onRegisterClick = () => {
    const { registerEmail, registerPassword, registerUsername } = this.state;
    this.props.register(registerUsername, registerEmail, registerPassword);
  }

  render() {
    const {
      onLoginUsernameChange,
      onLoginPasswordChange,
      onLoginClick,
      onRegisterUsernameChange,
      onRegisterEmailChange,
      onRegisterPasswordChange,
      onRegisterRepeatPasswordChange,
      onRegisterClick
    } = this;
    return (
      <LoginPageView
        onLoginUsernameChange={onLoginUsernameChange}
        onLoginPasswordChange={onLoginPasswordChange}
        onLoginClick={onLoginClick}
        onRegisterUsernameChange={onRegisterUsernameChange}
        onRegisterEmailChange={onRegisterEmailChange}
        onRegisterPasswordChange={onRegisterPasswordChange}
        onRegisterRepeatPasswordChange={onRegisterRepeatPasswordChange}
        onRegisterClick={onRegisterClick}
      />
    )
  }
}

const mapStateToProps = state => ({
  userToken: state.userToken,
});

const mapDispatchToProps = dispatch => ({
  login: (login, password) => dispatch(actionCreator.login(login, password)),
  register: (login, email, password) => dispatch(actionCreator.register(login, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
