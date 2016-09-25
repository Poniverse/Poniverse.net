import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Button, Row, Col, Panel, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import FormControl from '../../../layout/components/FormField/FormControl';
import { Field, reduxForm } from 'redux-form';

class TotpForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting, user } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Token
          </Col>
          <Col sm={9}>
            <Field name="token" type="text" component={FormControl} label=""/>
          </Col>
        </FormGroup>

        <Button bsStyle="primary" type="submit" disabled={submitting}>
          {submitting ? <i className="fa fa-spin fa-cog" /> : null} Validate
        </Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'totpForm'
})(TotpForm);
