import React from 'react';
import Channel from './channel';

class Chat extends React.Component {
  render() {
    return(
      <div>
        <Channel app={this.props.app} />
      </div>
    );
  }
}

export default Chat;
