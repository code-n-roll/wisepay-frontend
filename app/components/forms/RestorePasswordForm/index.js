import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import InputControl from 'components/controls/InputControl';
import { required, password } from 'components/forms/validations';
import { Link } from 'react-router/lib';
import PropTypes from 'prop-types';
import { restorePassword } from './actions';

class RestorePasswordForm extends Component {
  propTypes = {
    clearSubmitErrors: PropTypes.function,
  }

  render() {
    const { props } = this;

    return (
      <form onSubmit={props.handleSubmit(restorePassword)} autoComplete="off">
        <div>
          <Field
            name="new_password"
            type="password"
            placeholder="New password"
            component={InputControl}
            validate={[required]}
            style={{ paddingBottom: '20px' }}
          />
          <Field
            name="new_password_confirmation"
            type="password"
            placeholder="New password confirmation"
            component={InputControl}
            validate={[required]}
            style={{ paddingBottom: '40px' }}
          />
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--raised bg-blue text-white big-btn big-btn-margin"
          disabled={props.submitting || props.invalid}
          type="submit"
        >
          Save
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'RestorePasswordForm',
})(RestorePasswordForm);