import io from 'socket.io-client';
import feathers from 'feathers-client';
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ChatTheme from './styles/chat-theme';
import App from './app';

if (module.hot) {
  module.hot.accept();
}

// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  // Use localStorage to store our login token
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

injectTapEventPlugin();

render(<MuiThemeProvider muiTheme={getMuiTheme(ChatTheme)}><App app={app} /></MuiThemeProvider>, document.getElementById('app'));
