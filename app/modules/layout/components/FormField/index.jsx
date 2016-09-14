import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FormField extends Component {
  render() {
    const { input, label, type, meta: { touched, error } } = this.props;

    // TODO: Handle validation state

    return (
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={10}>
          <FormControl type={type} placeholder={label} {...input} />
        </Col>
      </FormGroup>
    )
  }
}

export default FormField;
