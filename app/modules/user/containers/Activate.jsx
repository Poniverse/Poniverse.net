import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reset } from 'redux-form';
import { Grid, Button, Row, Col, Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { getLoggedInUser, subscribeToNewsletter, unsubscribeFromNewsletter, updateUser, activateAccount } from '../redux/user';
import notification  from 'react-notification-system-redux';


class Activate extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      message: null
    };
  }

  componentWillMount() {
    const { actions, params: { code } } = this.props;

    actions.activateAccount(code).then((response) => {
      let message = 'Your account has been successfully activated!';

      if (response.data.emailChange) {
        message = 'Your email has been successfully updated!';
      }

      this.setState({
        loading: false,
        message
      })
    }).catch((error) => {
      let message = 'There was an unknown error activating your account :(';

      if (error.response.status === 404) {
        message = 'Invalid activation code :(';
      }

      this.setState({
        loading: false,
        message
      })
    });
  }

  render() {
    const { user } = this.props;

    const { loading, message } = this.state;

    console.log(this.props);

    return (
      <Grid className="text-center">
        {loading ? this.renderLoading() : <h1>{message}</h1>}
      </Grid>
    );
  }

  renderLoading() {
    return (
      <h1><i className="fa fa-cog fa-spin"></i> Activating Account</h1>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ...bindActionCreators({updateUser, activateAccount, ...notification}, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
