import React from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from 'components/loader-button';

import './index.css';

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      confirmationCode: '',
      confirmPassword: '',
      email: '',
      password: '',
      isLoading: false,
      newUser: null
    };
  }
  
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }
  
  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
      });
      this.setState({ newUser });
    } catch (ex) {
      console.error(ex.message);
      // TODO: check for usernameexists exception (if user refreshes during confirm)
      // TODO: use Auth.resendSignUp in this case
    }

    this.setState({ isLoading: false });
  }
  
  handleConfirmationSubmit = async event => {
    event.preventDefault();
    
    this.setState({ isLoading: true });
    
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    } catch (ex) {
      console.error(ex.message);
      this.setState({ isLoading: false });
    }
  }
  
  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autofocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          isLoading={this.state.isLoading}
          loadingText="Verifying"
          text="Verify"
          type="submit"
        />
      </form>
    );   
  }
  
  renderForm() {
    return (
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
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          isLoading={this.state.isLoading}
          loadingText="Signing up..."
          text="Signup"
          type="submit"
        />
      </form>
    );
  }
  
  render() {
    return (
      <div className="signup">
        {this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm()}
      </div>
    );
  }
}