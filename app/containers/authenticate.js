import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

class Authenticate extends React.Component {
  constructor() {
    super();

    this.state = {
      register: false,
      passwordsMatch: true
    };
  }

  authenticate() {
    let app = this.props.app;
    let self = this;

    app.authenticate(_.merge({
      type: 'local',
    }, this.userFromForm())).then((result) => {
      console.log('Authenticated!', app.get('token'));
      self.props.onAuthenticate();
    }).catch((error) => {
      console.error('Error authenticating!', error);
    });
  }

  userFromForm() {
    return {
      'email': this.refs.email.getValue(),
      'password': this.refs.password.getValue()
    };
  }

  register() {
    let app = this.props.app;
    let self = this;
    app.service('users').create(
      this.userFromForm()
    ).then((result) => {
      console.log('Signed up!', result);
      self.authenticate();
    }).catch((error) => {
      console.error('Error authenticating!', error);
    });
  }

  onSubmit(event) {
    if (this.state.register) {
      this.register();
    } else {
      this.authenticate();
    }
  }

  toggleRegister() {
    this.setState({
      register: !this.state.register
    });
  }

  checkPasswords() {
    let password1 = this.refs.password.getValue();
    let password2 = this.refs.passwordConfirmation.getValue();

    console.log(password1, password2);

    this.setState({
      passwordsMatch: this.state.register && password1 === password2
    });
  }

  render() {
    const actions = [
      <FlatButton
        label={ this.state.register ? "Sign in" : "Register" }
        primary={false}
        keyboardFocused={false}
        onTouchTap={this.toggleRegister.bind(this)}
      />,
      <FlatButton
        label={ this.state.register ? "Register" : "Sign in" }
        primary={true}
        keyboardFocused={true}
        disabled={ !this.state.passwordsMatch }
        onTouchTap={this.onSubmit.bind(this)}
      />,
    ];

    return (
      <Dialog
        title="Hi there!"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.onSubmit.bind(this)}>
        <TextField ref="email" hintText="email" type="email" />
        <TextField ref="password" hintText="Password" type="password" errorText={ this.state.passwordsMatch ? false : "Passwords don't match" } />
        { this.state.register && <TextField ref="passwordConfirmation" hintText="Repeat password" type="password" onBlur={ this.checkPasswords.bind(this) } /> }
      </Dialog>
    );
  }
}

export default Authenticate;
