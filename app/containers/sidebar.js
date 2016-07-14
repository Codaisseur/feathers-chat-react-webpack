import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.style = {
      top: 86,
      bottom: 86,
      left: 0,
      position: 'fixed',
      width: props.width
    };
  }

  componentDidMount() {
    const userService = this.props.app.service('users');

    userService.find({
      query: {
        $sort: { email: 1 },
        $limit: false
      }
    }).then((page) => {
      this.setState({
        users: page.data.reverse()
      });
    });

    // Listen to newly created users
    userService.on('created', (user) => {
      this.setState({
        users: this.state.users.concat(user)
      });
    });
  }

  renderUser(user) {
    let name = user.email.split('@')[0];
    return(
      <MenuItem key={user._id} primaryText={name} leftIcon={<Avatar src={user.avatar} />} />
    );
  }

  render() {
    return (
      <div>
        <div style={this.style}>
          {this.state.users.map(this.renderUser)}
        </div>
      </div>
    );
  }
}

export default SideBar;
