import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Button, Row, Col, Panel, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import FormControl from '../../../layout/components/FormField/FormControl';
import { Field, reduxForm } from 'redux-form';

class PasswordForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit} horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            Current Password
          </Col>
          <Col sm={8}>
            <Field name="current_password" type="password" component={FormControl} placeholder="***************"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            Password
          </Col>
          <Col sm={8}>
            <Field name="password" type="password" component={FormControl} placeholder="New Password"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            Confirm Password
          </Col>
          <Col sm={8}>
            <Field name="password_confirmation" type="password" component={FormControl} placeholder="Repeat"/>
          </Col>
        </FormGroup>

        <Button className="pull-right" bsStyle="primary" type="submit" disabled={submitting}>
          {submitting ? <i className="fa fa-spin fa-cog" /> : null} Update
        </Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'passwordForm'
})(PasswordForm);
