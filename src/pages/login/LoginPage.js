import React, { Component } from 'react';
import { Grid, Segment, Container, Header, Form, Divider } from 'semantic-ui-react';
import './LoginPage.css';

class LoginPage extends Component {
  onLoginClick = () => {
    this.props.navigation.navigate('Chat');
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
            <Form.Input placeholder='Username or email...' />
            <Form.Input placeholder='Password...' type='password' />
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

export default LoginPage;
