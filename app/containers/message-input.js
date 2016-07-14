import React from 'react';
import BaseModel from '../models/base-model';
import Paper from 'material-ui/Paper';
import ControlledTextField from '../components/controlled-textfield';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.model = new BaseModel(props.app, 'message');

    this.style = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      minHeight: 80,
      padding: 10
    };
  }

  sendMessage(message) {
    console.log('Message: ', message);

    this.model.addResource({
      text: message
    });

    this.onTextFieldChange();
  }

  componentDidMount() {
    this.onTextFieldChange();
  }

  onTextFieldChange() {
    this.props.onResize();
  }

  render() {
    return (
      <Paper id="messageInputWrapper" style={ this.style } rounded={ false }>
        <form onSubmit={ this.sendMessage.bind(this) }>
          <ControlledTextField
            onChange={this.onTextFieldChange.bind(this)}
            onSubmit={this.sendMessage.bind(this)} />
        </form>
      </Paper>
    );
  }
}

export default MessageInput;
