import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import Request from '../../../utils/request';
import User from '../../../utils/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: false,
      loginMessage: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const result = await Request.post('/login', { username, password }, true);
      const { status, validations } = result;
      if(status === 'VALIDATION_ERROR') {
        const messages = validations.map(item => `The ${item.attribute} is required.`);
        this.setState({
          loginError: true,
          loginMessage: messages.join('\n')
        });
        return;
      }
      if(status === 'USERNAME_PASSWORD_NOT_MATCHED') {
        this.setState({
          loginError: true,
          loginMessage: 'Username and password does not matched.'
        });
        return;
      }
      if(status === 'SUCCESS') {
        User.store(result.data);
        this.props.history.push('dashboard');
      }
    }catch(e){
      this.setState({
        loginError: true,
        loginMessage: 'Login failed'
      })
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {
                      this.state.loginError && (
                        <Alert color="danger" style={{whiteSpace: 'pre-line'}}>
                          {this.state.loginMessage}
                        </Alert>
                      )
                    }
                    <form onSubmit={this.onSubmit}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" onClick={this.onSubmit}>Login</Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
