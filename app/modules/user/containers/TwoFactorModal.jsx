import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Modal, Button, Form, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import {
  addTwoFactorStart,
  addTwoFactorFinish,
  addTwoFactorSetMethod,
  addTotpMethod,
  addU2fMethod,
  getTwoFactorMethods,
  selectTotp,
  selectU2f,
  validate2fa
} from "../redux/2fa";
import {Field, reduxForm} from "redux-form";
import notification from "react-notification-system-redux";
import QRCode from 'qrcode.react';
import TotpForm from '../components/TotpForm';
import speakeasy from 'speakeasy';

const errorNotification = {
  title: 'Error!',
  message: 'An unknown error occurred attempting to do something :(',
  position: 'tc',
  autoDismiss: 5,
};

class TwoFactorModal extends Component {
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

  renderChooseMethod() {
    const { twoFactor, actions } = this.props;

    return (
      <div>
        <Button onClick={() => actions.selectTotp()}>Totp</Button>
        <Button onClick={() => actions.selectU2f()}>U2f</Button>
      </div>
    )
  }

  handleTotpSubmit(data) {
    const { twoFactor, actions } = this.props;

    return actions.validate2fa(data, true)
      .then(() => {
        return actions.addTotpMethod('totp', {
          secret: twoFactor.new.data.key
        })
          .then(res => {
            actions.success({
              ...errorNotification,
              title: 'Success!',
              message: 'Added TOTP method to your account'
            });

            actions.addTwoFactorFinish();
          })
          .catch(err => {
            console.error(err);

            actions.error({
              ...errorNotification,
              message: 'Failed to add 2FA token to account'
            })
          });
      })
      .catch(() => {
        actions.error({
          ...errorNotification,
          message: 'Failed to validate 2fa token'
        })
      });
  }

  renderTotp() {
    const { twoFactor, actions } = this.props;

    return (
      <div>
        <QRCode value={twoFactor.new.data.url}/>

        <p>Key: {twoFactor.new.data.key}</p>

        <TotpForm onSubmit={::this.handleTotpSubmit}/>
      </div>
    )
  }

  renderU2f() {
    const { twoFactor, actions } = this.props;

    return (
      <div>
        {twoFactor.new.data.waitingForKey === true ? (
          <div>
            <i className="fa fa-cog fa-spin" /> Press the key on your U2F device.
          </div>
        ) : (
          <div>
            <i className="fa fa-cog fa-spin" /> Processing...
          </div>
        )}
      </div>
    )
  }

  render() {
    const { twoFactor, actions } = this.props;

    let content = '';

    switch (twoFactor.new.method) {
      default:
        content = this.renderChooseMethod();
        break;
      case 'totp':
        content = this.renderTotp();
        break;
      case 'u2f':
        content = this.renderU2f();
        break;
    }

    return (
      <Modal show={twoFactor.showModal} onHide={actions.addTwoFactorFinish}>
        <Modal.Header closeButton>
          <Modal.Title>Add Two Factor Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content}
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    twoFactor: state.twoFactor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addTwoFactorStart,
      addTwoFactorFinish,
      addTwoFactorSetMethod,
      getTwoFactorMethods,
      addTotpMethod,
      addU2fMethod,
      selectTotp,
      selectU2f,
      validate2fa,
      ...notification
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorModal);
