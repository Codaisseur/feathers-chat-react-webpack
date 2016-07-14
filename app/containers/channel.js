import React from 'react';
import Message from './message';
import BaseModel from '../models/base-model';
import { List } from 'material-ui/List';
import MessageInput from './message-input';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      paddingBottom: 80
    };
  }

  componentDidMount() {
    const messageService = this.props.app.service('messages');

    messageService.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: this.props.limit || 10
      }
    }).then((page) => {
      this.setState({
        messages: page.data.reverse()
      }, this.setScrollTop.bind(this));
    });

    // Listen to newly created messages
    messageService.on('created', (message) => {
      this.setState({
        messages: this.state.messages.concat(message)
      }, this.setScrollTop.bind(this));
    });
  }

  setScrollTop() {
    let inputHeight = document.getElementById('messageInputWrapper').clientHeight;
    document.getElementById('channelWrapper').style.paddingBottom = inputHeight;
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    return (
      <div id='channelWrapper' style={{ paddingBottom: this.state.paddingBottom }}>
        <List>
          {this.state.messages.map((message) => {
            return <Message key={ message._id } { ...message } />;
          })}
        </List>
        <MessageInput app={this.props.app} onResize={this.setScrollTop.bind(this)} />
      </div>
    );
  }
}

export default Channel;