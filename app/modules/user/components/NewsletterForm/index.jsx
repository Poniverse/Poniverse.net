import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Button, Row, Col, Panel, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import FormControl from '../../../layout/components/FormField/FormControl';
import { Field, reduxForm } from 'redux-form';

class NewsletterForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting, user } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Button bsStyle="primary" type="submit" disabled={submitting}>
          {submitting ? <i className="fa fa-spin fa-cog" /> : null} {user.has_newsletter_subscription ? 'Unsubscribe...' : 'Subscribe!'}
        </Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'newsletterForm'
})(NewsletterForm);
