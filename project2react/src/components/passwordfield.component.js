import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import zxcvbn from 'zxcvbn';

import FormField from './formfield.component.js';

class PasswordField extends Component {

  constructor(props) {
    super(props);
    this.minStrength = this.minStrength.bind(this);
    this.thresholdLength = this.thresholdLength.bind(this);
    this.validatePasswordStrength = this.validatePasswordStrength.bind(this);
    this.validatePasswordLength = this.validatePasswordLength.bind(this);
  };

  componentDidMount() {
    console.log('Mounting PasswordField');
  }


  // set default minStrength to 3 if not a number or not specified
  // minStrength must be a a number between 0 - 4

  minStrength() {
    return (typeof this.props.minStrength === 'number'
      ? Math.max( Math.min(this.props.minStrength, 4), 0 )
      : 3);
  }

  // set default thresholdLength to 7 if not a number or not specified
  // thresholdLength must be a minimum value of 7

  thresholdLength() {
    return(typeof this.props.thresholdLength === 'number'
      ? Math.max(this.props.thresholdLength, 7)
      : 7);
  }

  validatePasswordStrength(event) {
    const value = event.target.value;
    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength) throw new Error("Password is weak");
      return true;
  }

  validatePasswordLength(event) {
    const value = event.target.value;
    // ensure password is long enough
    if (value.length <= this.thresholdLength) throw new Error("Password is short");
      return true;
  }

  hasChanged(e) {
    console.log('hasChanged in passwordfield.component')
    this.setPassword(e.target.value);
    this.validatePasswordStrength(e);
    this.validatePasswordLength(e);
  }

  render() {
    const {...restProps} = this.props;
    // const { type, validator, onChange, children, value, ...restProps } = this.props;
    // const { password, strength } = this.props;
    // const passwordLength = this.props.password.length - 1;
    // const passwordStrong = strength >= this.props.minStrength;
    // const passwordLong = passwordLength > this.props.thresholdLength;

    // // dynamically set the password length counter class
    // const counterClass = ['badge badge-pill', passwordLong ? passwordStrong ? 'badge-success' : 'badge-warning' : 'badge-danger'].join(' ').trim();
    //
    // // password strength meter is only visible when password is not empty
    // const strengthClass = ['strength-meter mt-2', passwordLength > 0 ? 'visible' : 'invisible'].join(' ').trim();

    return (
      <Fragment>
        <div className="position-relative">
          {/** Pass the validation and stateChanged functions as props to the form field **/}
          <FormField type="password" onChange={ this.hasChanged } value={ this.props.registerPassword } {...restProps}>
            {/** Render the password strength meter **/}
            {/** <div className={strengthClass}>
              <div className="strength-meter-fill" data-strength={strength}></div>
            </div>*/}
          </FormField>
          {/**<div className="position-absolute password-count mx-3">
            {/** Render the password length counter indicator }
            <span className={counterClass}>{ passwordLength ? passwordLong ? `${this.props.thresholdLength}+` : passwordLength : '' }</span>
          </div>*/}
        </div>
      </Fragment>
    );
  }
}

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number
};

function mapStateToProps(state) {
  const { registerPassword } = state;
  return { password: registerPassword }
}

function mapDispatchToProps(dispatch) {
  return { password: (password) => dispatch({type: 'updatePassword', password: password})}
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordField);
