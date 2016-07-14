import React from 'react';
import Channel from './channel';
import SideBar from './sidebar';

class Chat extends React.Component {
  constructor() {
    super();

    let docSize = document.body.getBoundingClientRect();

    this.state = {
      sideBarWidth: 200,
      channelWidth: docSize.width - 200
    };
  }
  componentDidMount() {
    this.throttleResize('resize', 'optimizedResize');

    let self = this;
    window.addEventListener('optimizedResize', () => {
      let docSize = document.body.getBoundingClientRect();
      self.setState({
        sideBarWidth: 200,
        channelWidth: docSize.width - 200
      });
    });
  }

  throttleResize(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) { return; }
      running = true;
       requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  }

  render() {
    console.log(this.state);
    return(
      <div>
        <SideBar app={this.props.app} width={this.state.sideBarWidth} />
        <Channel app={this.props.app} width={this.state.channelWidth} />
      </div>
    );
  }
}

export default Chat;
