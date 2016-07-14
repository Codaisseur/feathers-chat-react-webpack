import React from 'react';
import TextField from 'material-ui/TextField';

class ControlledTextField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange(event) {
    this.setState({
      value: event.target.value,
    });
    this.props.onChange();
  }

  checkSubmitKeys(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.onSubmit(this.state.value);
      this.setState({
        value: ''
      }, this.props.onChange);
    }
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Type here..."
          fullWidth={true}
          multiLine={true}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.checkSubmitKeys.bind(this)}
        />
      </div>
    );
  }
}

export default ControlledTextField;
