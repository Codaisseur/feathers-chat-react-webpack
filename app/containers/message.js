import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TimeAgo from 'react-timeago';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

class Message extends React.Component {
  render() {
    console.log(this.props);
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        primaryText={ this.props.text }
        secondaryText={ <TimeAgo date={ this.props.createdAt } /> }
        leftAvatar={ <Avatar src={ this.props.sentBy.avatar } /> }
        rightIconButton={rightIconMenu}
      />
    );
  }
}

export default Message;
