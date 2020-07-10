import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import zxcvbn from 'zxcvbn';

class FormField extends Component {

  constructor(props) {
    super(props);
    // bind store update functions
    this.hasChanged = this.hasChanged.bind(this);
  }

  // state change watch functions for each field
  hasChanged(e) {
    e.preventDefault();
    const value = e.target.value;
    const field = e.target.id;
    console.log(value);
    console.log(field);
    switch(field) {
      case 'username': {
        const regex = /^[!-z]+$/;
        if (!regex.test(value)) alert('Username is invalid');
        this.props.setUsername(value);
        break;
      }
      case 'password': {
        if (!zxcvbn(value)) alert('Password is invalid');
        this.props.setPassword(value);
        break;
      }
      case 'confirm': {
        const password = document.getElementById('password');
        const confirm = document.getElementById('confirm');
        if (!zxcvbn(value)) alert('Password is invalid');
        if (password === confirm) alert('Passwords do not match.');
        this.props.setConfirm(value);
        break;
      }
      case 'role': {
        this.props.setRole(value);
        break;
      }
      case 'title': {
        this.props.setTitle(value);
        break;
      }
      case 'file_one': {
        this.props.setFileOne(e.target.files[0]);
        this.props.setFileNameOne(value);
        break;
      }
      case 'file_two': {
        this.props.setFileTwo(e.target.files[0]);
        this.props.setFileNameTwo(value);
        break;
      }
      case 'alt_text_one': {
        this.props.setAltTextOne(value);
        break;
      }
      case 'alt_text_two': {
        this.props.setAltTextTwo(value);
        break;
      }
      case 'keywords': {
        this.props.setKeywords(value);
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
  type: PropTypes.oneOf(["text", "password", "file"]).isRequired,
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  validator: PropTypes.func,
  onStateChanged: PropTypes.func
};

function mapStateToProps(state) {
  const { registerUser, registerPassword, confirm, role, title, file_one, file_two, file_name_one, file_name_two, alt_text_one, alt_text_two, keywords, error } = state;
  return {
    username: registerUser,
    password: registerPassword,
    confirm: confirm,
    role: role,
    title: title,
    file_one: file_one,
    file_two: file_two,
    file_name_one: file_name_one,
    file_name_two: file_name_two,
    alt_text_one: alt_text_one,
    alt_text_two: alt_text_two,
    keywords: keywords,
    error: error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUsername: (username) => dispatch({type: 'updateUsername', username: username }),
    setPassword: (password) => dispatch({type: 'updatePassword', password: password}),
    setConfirm: (confirm) => dispatch({type: 'updateConfirm', confirm: confirm }),
    setRole: (role) => dispatch({type: 'updateRole', role: role}),
    setTitle: (title) => dispatch({type: 'updateTitle', title: title}),
    setFileOne: (file_one) => dispatch({type: 'updateFileOne', file_one: file_one}),
    setFileTwo: (file_two) => dispatch({type: 'updateFileTwo', file_two: file_two}),
    setFileNameOne: (file_name_one) => dispatch({type: 'updateFileNameOne', file_name_one: file_name_one}),
    setFileNameTwo: (file_name_two) => dispatch({type: 'updateFileNameTwo', file_name_two: file_name_two}),
    setAltTextOne: (alt_text_one) => dispatch({type: 'updateAltTextOne', alt_text_one: alt_text_one}),
    setAltTextTwo: (alt_text_two) => dispatch({type: 'updateAltTextTwo', alt_text_two: alt_text_two}),
    setKeywords: (keywords) => dispatch({type: 'updateKeywords', keywords: keywords}),
    setError: (error) => dispatch({type: 'updateError', error: error})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField);
