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
    passwordsDoNotMatch: false,
  };

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
    const { registerEmail, registerPassword, registerUsername, registerRepeatPassword } = this.state;
    if(registerPassword !== registerRepeatPassword) {
      this.setState({ passwordsDoNotMatch: true });
      return;
    }
    this.props.register(registerUsername, registerEmail, registerPassword);
    this.setState({ passwordsDoNotMatch: false });
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
    const { loginError, registerError } = this.props;
    const { passwordsDoNotMatch } = this.state;
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
        loginError={loginError}
        registerError={registerError}
        passwordsDoNotMatch={passwordsDoNotMatch}
      />
    )
  }
}

const mapStateToProps = state => ({
  loginError: state.loginError,
  registerError: state.registerError,
});

const mapDispatchToProps = dispatch => ({
  login: (login, password) => dispatch(actionCreator.login(login, password)),
  register: (login, email, password) => dispatch(actionCreator.register(login, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
