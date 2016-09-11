import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Home);
