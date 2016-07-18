import React from 'react';
import Message from './message';
import MessageModel from '../models/message-model';
import { List } from 'material-ui/List';
import MessageInput from './message-input';
import _ from 'lodash';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.model = new MessageModel(props.app);
    this.model.subscribe(this.updateMessages.bind(this));
    this.model.subscribe(this.setScrollTop.bind(this));

    this.state = {
      messages: []
    };

    this.style = {
      paddingTop: 56,
      paddingBottom: 86,
      width: props.width,
      float: 'right'
    };
  }

  updateMessages() {
    this.setState({
      messages: this.model.resources
    });
  }

  updateMessage(id, properties) {
    // const app = this.props.app;
    // const messageService = app.service('messages');

    this.model.save(id, properties);

    // messageService.update(id, properties, (response) => {
    //   console.log(response);
    // });
  }

  setScrollTop() {
    let inputHeight = document.getElementById('messageInputWrapper').clientHeight;
    document.getElementById('channelWrapper').style.paddingBottom = inputHeight;
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    return (
      <div id='channelWrapper' style={ _.merge(this.style, { width: this.props.width }) }>
        <List>
          {this.state.messages.map((message) => {
            return <Message key={ message._id } { ...message } onUpdate={this.updateMessage.bind(this)} />;
          })}
        </List>
        <MessageInput app={this.props.app} onResize={this.setScrollTop.bind(this)} />
      </div>
    );
  }
}

export default Channel;
