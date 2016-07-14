import React from 'react';

class Header extends React.Component {
  logout() {
    let self = this;

    this.props.app.logout().then(() => {
      self.props.onAuthenticateError();
    });
  }

  render() {
    return(
      <div>
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>
    );
  }
}

export default Header;
