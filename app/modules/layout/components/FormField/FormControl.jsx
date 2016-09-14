import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Form, FormGroup, FormControl as BSFormControl, ControlLabel } from 'react-bootstrap';

const FormControl = ({ input, type, meta: { touched, error }, ...props }) => {
  return <BSFormControl type={type} {...input} {...props} />;
};

export default FormControl;
