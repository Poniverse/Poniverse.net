import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';

class FormField extends Component {
  render() {
    const { input, label, type, meta: { touched, error } } = this.props;

    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type}/>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    )
  }
}

export default FormField;
