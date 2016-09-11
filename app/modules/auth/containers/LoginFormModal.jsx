import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { startAuth, finishAuth, login } from '../redux/auth';
import { Field, reduxForm } from 'redux-form';
import LoginForm from '../components/LoginForm';

class LoginFormModal extends Component {
  handleOnSubmit({username, password}) {
    const { actions } = this.props;

    actions.login(username, password);
  }

  render() {
    const { auth, actions } = this.props;

    return (
      <Modal show={auth.showAuthModal} onHide={actions.finishAuth}>
        <Modal.Header closeButton>
          <Modal.Title>Poniverse Auth</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm
            onSubmit={::this.handleOnSubmit}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={actions.finishAuth}>Close</Button>
        </Modal.Footer>
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
  return { actions: bindActionCreators({startAuth, finishAuth, login}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormModal);
