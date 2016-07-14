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
import fonts from '../styles/fonts';
import ControlledTextField from '../components/controlled-textfield';
import Utils from '../lib/utils';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.utils = new Utils();

    this.style = {
      fontFamily: fonts.sansSerif,
    };

    this.state = {
      editing: false,
      text: props.text
    };
  }

  editMessage() {
    this.setState({
      editing: true
    });
  }

  updateMessage(newMessage) {
    this.props.onUpdate(this.props._id, this.utils.extend({}, this.props, { text: newMessage, onUpdate: null, updatedAt: Date.now }));
    this.setState({
      text: newMessage,
      editing: false
    });
  }

  changeMessage() {
    console.log('ignore..', arguments);
  }

  render() {
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
        <MenuItem onClick={this.editMessage.bind(this)}>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    let text = this.state.text;

    if (this.state.editing) {
      text = (<ControlledTextField
        value={text}
        onChange={this.changeMessage.bind(this)}
        onSubmit={this.updateMessage.bind(this)} />);
    }

    return (
      <ListItem
        primaryText={ text }
        secondaryText={ <TimeAgo date={ this.props.createdAt } /> }
        leftAvatar={ <Avatar src={ this.props.sentBy.avatar } /> }
        rightIconButton={rightIconMenu}
        disabled={true}
        style={ this.style }
      />
    );
  }
}

export default Message;
