import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from 'components/loader-button';

import './index.css';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };
  }
  
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
    
    this.setState({ isLoading: true });
    
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (ex) {
      alert(ex.message);
      this.setState({ isLoading: false });
    }
  }
  
  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            isLoading={this.state.isLoading}
            loadingText="Logging in..."
            text="Login"
            type="submit"
          />
        </form>
      </div>
    );
  }
}
