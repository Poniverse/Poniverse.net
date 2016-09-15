import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reset } from 'redux-form';
import { Grid, Button, Row, Col, Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { getLoggedInUser, subscribeToNewsletter, unsubscribeFromNewsletter, updateUser } from '../redux/user';
import AccountForm from '../components/AccountForm';
import PasswordForm from '../components/PasswordForm';
import NewsletterForm from '../components/NewsletterForm';
import notification  from 'react-notification-system-redux';

const successNotification = {
  title: 'Account Updated!',
  message: 'Your account has been successfully updated!',
  position: 'tc',
  autoDismiss: 5,
};
const errorNotification = {
  title: 'Error!',
  message: 'Your account failed to be updated!',
  position: 'tc',
  autoDismiss: 5,
};

const noFieldsModifiedNotification = {
  title: 'Warning!',
  message: 'No fields have been modified!',
  position: 'tc',
  autoDismiss: 5,
};

class Preferences extends Component {
  handleNewsletterToggle() {
    const { user, actions } = this.props;

    let promise = null;

    if (user.has_newsletter_subscription) {
      promise = actions.unsubscribeFromNewsletter();
    } else {
      promise = actions.subscribeToNewsletter();
    }

    return promise.then(() => {
      actions.success({
        ...successNotification,
        message: 'Your newsletter preferences have been updated!'
      });
    }).catch((error) => {
      error.response.data.errors.forEach(::this.processError);

      throw error;
    })
  }

  handleAccountFormSubmit(values) {
    const { actions, user } = this.props;
    const update = {};

    // Get difference
    Object.keys(values).forEach(key => {
      if (values[key] === user[key]) return;

      update[key] = values[key];
    });

    if (Object.keys(update).length === 0) {
      return actions.warning(noFieldsModifiedNotification);
    }

    return actions.updateUser(update).then(() => {
      actions.success(successNotification);
    }).catch((error) => {
      error.response.data.errors.forEach(::this.processError);

      throw error;
    });
  }

  handlePasswordFormSubmit(values) {
    const { actions } = this.props;

    if (Object.keys(values).length !== 3) {
      return actions.warning({
        ...noFieldsModifiedNotification,
        message: 'Please fill in all fields to change your password.'
      });
    }
    return actions.updateUser(values).then(() => {
      actions.reset('passwordForm')
    }).catch((error) => {
      error.response.data.errors.forEach(::this.processError);

      throw error;
    });
  }

  handleResendConfirmationEmail() {
    const { actions } = this.props;

    const data = {
      resendConfirmation: true
    };

    return actions.updateUser(data).then(() => {
      actions.success({
        ...successNotification,
        message: 'Confirmation email has been resent.'
      });
    }).catch((error) => {
      error.response.data.errors.forEach(::this.processError);

      throw error;
    });
  }

  handleEmailChangeCancel() {
    const { actions } = this.props;

    const data = {
      cancelEmailChange: true
    };

    return actions.updateUser(data).then(() => {
      actions.success({
        ...successNotification,
        message: 'Email change request has been cancelled.'
      });
    }).catch((error) => {
      error.response.data.errors.forEach(::this.processError);

      throw error;
    });
  }

  processError(error) {
    const { actions } = this.props;

    actions.error({
      ...errorNotification,
      message: error.detail
    })
  }

  render() {
    const { user } = this.props;

    return (
      <Grid>
        <h1>Preferences</h1>
        <hr />

        {user.new_email ? this.renderEmailChange() : null}

        <Row>
          <Col xs={6}>
            <Panel>
              <h2 style={{marginTop: 0}}>Account</h2>

              <hr />

              <AccountForm onSubmit={::this.handleAccountFormSubmit} initialValues={user} />
            </Panel>
          </Col>
          <Col xs={6}>
            <Panel>
              <h2 style={{marginTop: 0}}>Password</h2>

              <hr />

              <PasswordForm onSubmit={::this.handlePasswordFormSubmit} />
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Panel>
              <h2 style={{marginTop: 0}}>Poniverse Newsletter</h2>

              <p>
                Delivered monthly, the <strong>Poniverse Newsletter</strong> keeps you in the loop on everything going on in the network! You may control your subscription preferences here.
              </p>

              <p>
                New issues will be delivered to the email address we have on file for you, <strong>{user.email}</strong>. If you update your account's email in the future, we'll automatically reroute your newsletter emails there.
              </p>

              <NewsletterForm user={user} onSubmit={::this.handleNewsletterToggle} />

              <br />

              <p>
                <em>Note: You can unsubscribe at any time.</em>
              </p>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }

  renderEmailChange() {
    const { user } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <Panel bsStyle="warning">
            <h2 style={{marginTop: 0}}>Notification: Pending Email Change</h2>

            <p>You have a pending email address change to <strong>{ user.new_email }</strong>. Click the link sent to you in the confirmation email in order to change your email address.</p>

            <Button bsStyle="primary" type="submit" onClick={::this.handleResendConfirmationEmail}>Resend Email</Button>&nbsp;

            <Button bsStyle="primary" type="submit" onClick={::this.handleEmailChangeCancel}>Cancel Change</Button>
          </Panel>
        </Col>
      </Row>
    )
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
      ...bindActionCreators({getLoggedInUser, subscribeToNewsletter, unsubscribeFromNewsletter, updateUser, reset, ...notification}, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
