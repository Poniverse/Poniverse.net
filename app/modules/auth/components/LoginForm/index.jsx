import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import FormField from '../../../layout/components/FormField';

class LoginForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>

        <Field name="username" type="text" component={FormField} label="Username"/>

        <Field name="password" type="password" component={FormField} label="Password"/>

        {error && <strong>{error}</strong>}

        <div>
          <Button type="submit" disabled={submitting}>Log In</Button>
          <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm);
