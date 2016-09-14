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

class Preferences extends Component {
  handleNewsletterToggle() {
    const { user, actions } = this.props;

    if (user.has_newsletter_subscription) {
      return actions.unsubscribeFromNewsletter();
    } else {
      return actions.subscribeToNewsletter();
    }
  }

  handleAccountFormSubmit(values) {
    const { actions } = this.props;

    return actions.updateUser(values);
  }

  handlePasswordFormSubmit(values) {
    const { actions } = this.props;

    return actions.updateUser(values).then(() => actions.reset('passwordForm'));
  }

  render() {
    const { user } = this.props;

    return (
      <Grid>
        <h1>Preferences</h1>
        <hr />
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
}

function mapStateToProps(state) {
  return {
    user: state.user.data
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({getLoggedInUser, subscribeToNewsletter, unsubscribeFromNewsletter, updateUser, reset}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
