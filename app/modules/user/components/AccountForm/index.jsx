import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect, reset } from 'react-redux';
import { Grid, Button, Row, Col, Panel, Form, FormGroup, ControlLabel, FormControl as BSFormControl } from 'react-bootstrap';
import FormControl from '../../../layout/components/FormField/FormControl';
import { Field, reduxForm } from 'redux-form';
import FormField from '../../../layout/components/FormField';

class AccountForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit} horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Username
          </Col>
          <Col sm={9}>
            <Field name="username" type="text" component={FormControl} readOnly/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Display Name
          </Col>
          <Col sm={9}>
            <Field name="display_name" type="text" component={FormControl} label="Display Name"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Email
          </Col>
          <Col sm={9}>
            <Field name="email" type="text" component={FormControl} label="Email"/>
          </Col>
        </FormGroup>

        <Button className="pull-right" type="submit" bsStyle="primary" disabled={submitting}>
          {submitting ? <i className="fa fa-spin fa-cog" /> : null} Update
        </Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'accountForm'
})(AccountForm);
