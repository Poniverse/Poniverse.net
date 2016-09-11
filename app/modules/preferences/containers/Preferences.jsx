import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Preferences extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Hello {user.data.display_name}!</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Preferences);
