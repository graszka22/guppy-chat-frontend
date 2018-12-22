import React, { Component } from 'react';
import { Grid, Segment, Container, Header, Form, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './LoginPage.css';
import { actionCreator } from '../../reducers';

class LoginPage extends Component {
  state = {
    loginUsername: "", 
    loginPassword: "",
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

  onLoginClick = () => {
    const { loginUsername, loginPassword } = this.state;
    this.props.login(loginUsername, loginPassword);
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
            <Form.Input placeholder='Username...' />
            <Form.Input placeholder='E-mail address...' />
            <Form.Input placeholder='Password...' type='password' />
            <Form.Input placeholder='Repeat password...' type='password' />
            <Form.Button basic content='Register' color='blue'  icon='right arrow' labelPosition='right' />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
