import React from 'react';
import { Grid, Segment, Container, Header, Form, Message } from 'semantic-ui-react';
import './LoginPage.css';

const LoginPageView = ({
    onLoginUsernameChange,
    onLoginPasswordChange,
    onLoginClick,
    onRegisterUsernameChange,
    onRegisterEmailChange,
    onRegisterPasswordChange,
    onRegisterRepeatPasswordChange,
    onRegisterClick,
    loginError,
    registerError,
    passwordsDoNotMatch,
}) => (
    <div className="LoginPage">
    <div className="Content">
    <h1>GuppyChat</h1>
    <h2>A simple chat that just works (not yet tho :p).</h2>
    <Container className="logincontainer">
      <Segment raised>
      <Grid columns={2} divided>
      <Grid.Row>
      <Grid.Column>
        <Form error={loginError}>
          <Header as="h3">Log in</Header>
          <Message
            error
            header='Cannot log in'
            content='Invalid username or password'
          />
          <Form.Input placeholder='Username or email...' onChange={onLoginUsernameChange} />
          <Form.Input placeholder='Password...' type='password' onChange={onLoginPasswordChange} />
          <Form.Button
            basic
            content='Login'
            color='blue'
            icon='right arrow'
            labelPosition='right'
            onClick={onLoginClick}
          />
        </Form>
        </Grid.Column>
        <Grid.Column>
        <Form error={registerError || passwordsDoNotMatch}>
          <Header as="h3">Register a new account</Header>
          <Message
            error
            header='Cannot register'
            content={registerError ? 'Probably this username/email is not available' : 'Passwords do not match'}
          />
          <Form.Input placeholder='Username...' onChange={onRegisterUsernameChange} />
          <Form.Input placeholder='E-mail address...' onChange={onRegisterEmailChange} />
          <Form.Input placeholder='Password...' type='password' onChange={onRegisterPasswordChange} />
          <Form.Input placeholder='Repeat password...' type='password' onChange={onRegisterRepeatPasswordChange} />
          <Form.Button
            basic
            content='Register'
            color='blue'
            icon='right arrow'
            labelPosition='right'
            onClick={onRegisterClick}
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

export default LoginPageView;
