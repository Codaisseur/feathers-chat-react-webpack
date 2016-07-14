import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Avatar from 'material-ui/Avatar';

class Header extends React.Component {
  logout() {
    let self = this;

    this.props.app.logout().then(() => {
      self.props.onAuthenticateError();
    });
  }

  render() {
    return(
      <AppBar
        title='SLAKO'
        iconElementLeft={<Avatar src={ this.props.currentUser.avatar } />}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)} />
          </IconMenu>
        }
      />
    );
  }
}

export default Header;
