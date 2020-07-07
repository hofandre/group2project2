import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import zxcvbn from 'zxcvbn';

class FormField extends Component {

  constructor(props) {
    super(props);
    // bind store update functions
    this.hasChanged = this.hasChanged.bind(this);
    this.passwordsMatch = this.passwordsMatch.bind(this);
  }

  passwordsMatch() {
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');
    if(password !== confirm) {

    }
  }

  // state change watch functions for each field
  hasChanged(e) {
    e.preventDefault();
    const value = e.target.value;
    const field = e.target.id;
    switch(field) {
      case 'username': {
        const regex = /^[!-z]+$/;
        if (!regex.test(value)) this.props.updateError('Username is invalid');
        this.props.setUsername(value);
        break;
      }
      case 'password': {
        if (!zxcvbn(value)) this.props.updateError('Password is invalid');
        this.props.setPassword(value);
        break;
      }
      case 'confirm': {
        const password = document.getElementById('password');
        const confirm = document.getElementById('confirm');
        if (!zxcvbn(value)) this.props.updateError('Password is invalid');
        if (password !== confirm) this.props.updateError('Passwords do not match.');
        this.props.setConfirm(value);
        break;
      }
      case 'role': {
        this.props.setRole(value);
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    const { value } = this.props;
    const { type, label, fieldId, placeholder, children } = this.props;
    const { error } = this.props;
    return (
      <Fragment>
        <div className="form-group px-3 pb-2">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <label htmlFor={fieldId} className="control-label">{label}</label>
          </div>
          {/** Render the children nodes passed to component **/}
          {children}
          <span><input type={type} id={fieldId} placeholder={placeholder} value={value} onChange={this.hasChanged} />{error}</span>
        </div>
      </Fragment>
    );
  }
}

FormField.propTypes = {
  type: PropTypes.oneOf(["text", "password", "select"]).isRequired,
  label: PropTypes.string.isRequired,
  fieldid: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  validator: PropTypes.func,
  onStateChanged: PropTypes.func
};

function mapStateToProps(state) {
  const { registerUser, registerPassword, confirm, role } = state;
  return {
    username: registerUser,
    password: registerPassword,
    confirm: confirm,
    role: role
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUsername: (username) => dispatch({type: 'updateUsername', username: username }),
    setPassword: (password) => dispatch({type: 'updatePassword', password: password}),
    setConfirm: (confirm) => dispatch({type: 'updateConfirm', confirm: confirm }),
    setRole: (role) => dispatch({type: 'updateRole', role: role}),
    setError: (error) => dispatch({type: 'updateError', error: error})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField);
