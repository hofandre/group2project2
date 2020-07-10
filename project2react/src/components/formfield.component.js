import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FormField extends Component {

  constructor(props) {
    super(props);
    // bind store update functions
    this.hasChanged = this.hasChanged.bind(this);
  }

  // state change watch functions for each field
  hasChanged(e) {
    const value = e.target.value;
    const field = e.target.id;
    console.log(value);
    console.log(field);
    e.preventDefault();
    switch(field) {
      case 'username': {
        const regex = /^[a-zA-Z0-9]+$/;
        if (!regex.test(value)) throw new Error('Username is invalid');
        console.log(value);
        this.props.setUsername(value);
        break;
      }
      case 'password': {
        this.props.setPassword(value);
        break;
      }
      case 'confirm': {
        this.props.setConfirm(value);
        break;
      }
      case 'role': {
        this.props.setRole(value);
        break;
      }
      case 'age': {
        this.props.setAge(value);
        break;
      }
      default: {
        break;
      }
    }
    // // destructure props - assign default dummy functions to validator and onStateChanged props
    // const { label, required = false, validator = f => f, onStateChanged = f => f } = this.props;
    // const isEmpty = value.length === 0;
    // const requiredMissing = this.state.dirty && required && isEmpty;
    //
    // let errors = [];
    //
    // if (requiredMissing) {
    //   // if required and is empty, add required error to state
    //   errors = [ ...errors, `${label} is required` ];
    // } else if ('function' === typeof validator) {
    //   try {
    //     validator(value);
    //   } catch (e) {
    //     // if validator throws error, add validation error to state
    //     errors = [ ...errors, e.message ];
    //   }
    // }
  }

  render() {
    const { value } = this.props;
    const { type, label, fieldId, placeholder, children } = this.props;

    // const hasErrors = errors.length > 0;
    // const controlClass = ['form-control', dirty ? hasErrors ? 'is-invalid' : 'is-valid' : '' ].join(' ').trim();

    return (
      <Fragment>
        <div className="form-group px-3 pb-2">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <label htmlFor={fieldId} className="control-label">{label}</label>
          </div>
          {/** Render the children nodes passed to component **/}
          {children}
          <input type={type} id={fieldId} placeholder={placeholder} value={value} onChange={this.hasChanged} />
        </div>
      </Fragment>
    );
  }
}

FormField.propTypes = {
  type: PropTypes.oneOf(["text", "password"]).isRequired,
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  validator: PropTypes.func,
  onStateChanged: PropTypes.func
};

function mapStateToProps(state) {
  const { registerUser, registerPassword, confirm, role, registerAge } = state;
  return {
    username: registerUser,
    password: registerPassword,
    confirm: confirm,
    role: role,
    age: registerAge
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUsername: (username) => dispatch({type: 'updateUsername', username: username }),
    setPassword: (password) => dispatch({type: 'updatePassword', password: password}),
    setConfirm: (confirm) => dispatch({type: 'updateConfirm', confirm: confirm }),
    setRole: (role) => dispatch({type: 'updateRole', role: role}),
    setAge: (age) => dispatch({type: 'updateAge', age: age})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField);
