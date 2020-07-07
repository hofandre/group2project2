import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from './formfield.component.js';
import SelectField from './selectfield.component.js';

class JoinForm extends Component {

  // initialize state to hold validity of form fields
  constructor(props){
      super(props);
      console.log('JoinForm component constructor.');
      console.log(props);
  }

  // higher-order function that returns a state change watch function
  // sets the corresponding state property to true if the form field has no errors
  fieldStateChanged = field => state => this.setState({ [field]: state.errors.length === 0 });

  render() {
    return (
      <div className="form-container d-table-cell position-relative align-middle">
          <div className="py-5 border-gray border-top border-bottom">
            {/** Render the fullname form field. **/}
            <FormField type="text" fieldid="username" label="Username" placeholder="Enter Username" onChange={this.usernameChanged} required />

            {/** Render the password field component. **/}
            <FormField type="password" fieldid="password" label="Password" placeholder="Enter Password" onChange={this.passwordChanged} thresholdLength={7} minStrength={3} required />

            {/** Render the confirm password field component. */}
            <FormField type="password" fieldid="confirm" label="Password" placeholder="Confirm Password" onChange={this.confirmChanged} thresholdLength={7} minStrength={3} required />

            {/** Render the drop down field for the user role. */}
            <SelectField type="select" fieldid="role" label="Role" placeholder="Enter Role" required />
          </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { registerUser, registerPassword, confirm, role } = state;
  return {
    setUsernameValue: registerUser,
    setPasswordValue: registerPassword,
    setConfirmValue: confirm,
    setRoleValue: role
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUsername: (setUsernameValue) => dispatch({type: 'setUsername', username: setUsernameValue }),
    setConfirm: (setConfirmValue) => dispatch({type: 'setConfirm', confirm: setConfirmValue }),
    setPassword: (setPasswordValue) => dispatch({type: 'setPassword', password: setPasswordValue}),
    setRole: (setRoleValue) => dispatch({type: 'setRole', role: setRoleValue})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
