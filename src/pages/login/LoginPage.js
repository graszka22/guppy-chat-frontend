import React, { Component } from 'react';
import { Grid, Segment, Container, Header, Form, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './LoginPage.css';
import { actionCreator } from '../../reducers';

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

  onRegisterRepeatPassword = (ev, data) => this.setState({ registerRepeatPassword: data.value });

  onLoginClick = () => {
    const { loginUsername, loginPassword } = this.state;
    this.props.login(loginUsername, loginPassword);
  }

  onRegisterClick = () => {
    const { registerEmail, registerPassword, registerUsername } = this.state;
    this.props.register(registerUsername, registerEmail, registerPassword);
  }

  render() {
    return (
      <div className="LoginPage">
      <div className="Content">
      <h1>GuppyChat</h1>
      <h2>A simple chat that just works (not yet tho :p).</h2>
      <Container className="logincontainer">
        <Segment raised>
        <Grid columns={2} divided>
        <Grid.Row>
        <Grid.Column>
          <Form>
            <Header as="h3">Log in</Header>
            <Form.Input placeholder='Username or email...' onChange={this.onLoginUsernameChange} />
            <Form.Input placeholder='Password...' type='password' onChange={this.onLoginPasswordChange} />
            <Form.Button
              basic
              content='Login'
              color='blue'
              icon='right arrow'
              labelPosition='right'
              onClick={this.onLoginClick}
            />
          </Form>
          </Grid.Column>
          <Grid.Column>
          <Form>
            <Header as="h3">Register a new account</Header>
            <Form.Input placeholder='Username...' onChange={this.onRegisterUsernameChange} />
            <Form.Input placeholder='E-mail address...' onChange={this.onRegisterEmailChange} />
            <Form.Input placeholder='Password...' type='password' onChange={this.onRegisterPasswordChange} />
            <Form.Input placeholder='Repeat password...' type='password' onChange={this.onRegisterRepeatPassword} />
            <Form.Button
              basic
              content='Register'
              color='blue'
              icon='right arrow'
              labelPosition='right'
              onClick={this.onRegisterClick}
            />
          </Form>
          </Grid.Column>
          </Grid.Row>
          </Grid>
        </Segment>
        </Container>
        </div>
      </div>
    );
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
