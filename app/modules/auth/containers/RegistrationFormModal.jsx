import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { startAuth, finishRegistration, register, login } from '../redux/auth';
import { Field, reduxForm } from 'redux-form';
import RegistrationForm from '../components/RegistrationForm';
import notification  from 'react-notification-system-redux';

const errorNotification = {
  title: 'Error!',
  message: 'An unknown error occurred attempting to register your account :(',
  position: 'tc',
  autoDismiss: 5,
};

class LoginFormModal extends Component {
  handleOnSubmit(data) {
    const { actions } = this.props;

    actions.register(data)
      .catch(error => {
        error.response.data.errors.forEach(::this.processError);
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
    const { auth, actions } = this.props;

    return (
      <Modal show={auth.showRegistrationModal} onHide={actions.finishRegistration}>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { auth.registrationSuccessful === false ? (
            <RegistrationForm
              onSubmit={::this.handleOnSubmit}
            />
          ) : (
            <div>
              <h3>Almost done!</h3>
              <p>Before we can let you off into the wild we must first verify you have an active email to activate your account, so we've sent you an email.</p>
              <p>It should arrive instantly however it could take up-to 10 minutes, if you haven't received it by then try checking your junk/spam folder.</p>

              <Button onClick={actions.finishRegistration}>Close</Button>
            </div>
          ) }
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({startAuth, finishRegistration, register, ...notification}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormModal);
