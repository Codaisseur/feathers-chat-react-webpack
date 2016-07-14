import React from 'react';
import Authenticate from './containers/authenticate';
import Header from './containers/header';
import Chat from './containers/chat';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    this.authenticate();
  }

  onAuthenticate() {
    this.setState({
      authenticated: true
    });
  }

  onAuthenticateError() {
    this.setState({
      authenticated: false
    });
  }

  authenticate() {
    let app = this.props.app;
    let self = this;

    app.authenticate().then(() => {
      self.setState({ authenticated: true });
    }).catch(error => {
      if(error.code === 401) {
        self.setState({ authenticated: false });
      }

      console.error(error);
    });
  }

  render() {
    let app = this.props.app;

    if (this.state.authenticated) {
      return(
        <div>
          <Header app={app} onAuthenticateError={this.onAuthenticateError.bind(this)} />
          <Chat app={app} onAuthenticateError={this.onAuthenticateError.bind(this)} />
        </div>
      );
    } else {
      return(
        <Authenticate app={app} onAuthenticate={this.onAuthenticate.bind(this)} />
      );
    }
  }
}

export default App;
