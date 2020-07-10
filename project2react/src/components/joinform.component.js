import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from './formfield.component.js';

class JoinForm extends Component {

  // initialize state to hold validity of form fields
  constructor(props){
      super(props);
      console.log('JoinForm component constructor.');
      console.log(props);
      // this.handleAge = this.handleAge.bind(this);
  }

  // higher-order function that returns a state change watch function
  // sets the corresponding state property to true if the form field has no errors
  fieldStateChanged = field => state => this.setState({ [field]: state.errors.length === 0 });

  render() {
    return (
      <div className='container'>
        <div className="form-container d-table-cell position-relative align-center">
          <form action="/" method="POST" noValidate>

            {/* <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5"> */}
              {/* <legend className="form-label mb-0">Support Team</legend> */}
              {/** Show the form button only if all fields are valid **/}
              {/* { <button type="button" className="btn btn-primary text-uppercase px-3 py-2">Join</button> } */}
            {/* </div> */}

            <div className="py-5 border-gray border-top border-bottom">
              {/** Render the fullname form field passing the name validation fn **/}
              <FormField type="text" fieldId="username" label="Username" placeholder="Enter Username" onChange={this.usernameChanged} required />

              {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
              <FormField type="password" fieldId="password" label="Password" placeholder="Enter Password" onChange={this.passwordChanged} thresholdLength={7} minStrength={3} required />

              {/** Render the confirm password field component using thresholdLength of 7 and minStrength of 3 */}
              <FormField type="password" fieldId="confirm" label="Password" placeholder="Confirm Password" onStateChanged={this.confirmChanged} thresholdLength={7} minStrength={3} required />

              {/** Render the age field component */}
              <FormField type="number" fieldId="age" label="Age" placeholder="Enter your Age" onStateChanged={this.confirmChanged} required />
            </div>
          </form>
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
