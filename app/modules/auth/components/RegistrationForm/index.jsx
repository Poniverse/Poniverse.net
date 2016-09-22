import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Button, Row, Col, Panel, Form, FormGroup, ControlLabel, FormControl as BSFormControl } from 'react-bootstrap';
import FormControl from '../../../layout/components/FormField/FormControl';
import { Field, reduxForm } from 'redux-form';
import FormField from '../../../layout/components/FormField';

class RegistrationForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Username
          </Col>
          <Col sm={9}>
            <Field name="username" type="text" component={FormControl}/>
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

        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Password
          </Col>
          <Col sm={9}>
            <Field name="password" type="password" component={FormControl} placeholder="Password"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            &nbsp;
          </Col>
          <Col sm={9}>
            <p>
              <br />

              Delivered monthly, our free newsletter keeps you in the loop with community spotlights,
              project updates straight from our staff, and exclusive interviews. Want in?
            </p>

            <label>
              <Field name="newsletter" type="checkbox" component={FormControl} placeholder="newsletter"/> Yes Please!
            </label>
          </Col>
        </FormGroup>

        <Button className="pull-right" type="submit" bsStyle="primary" disabled={submitting}>
          {submitting ? <i className="fa fa-spin fa-cog" /> : null} Register
        </Button>

        <br style={{clear: 'both'}}/>
      </form>
    )
  }
}

export default reduxForm({
  form: 'registrationForm'
})(RegistrationForm);
