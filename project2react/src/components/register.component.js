import React from 'react';
import RegisterService from '../services/register.service'
import { connect } from 'react-redux';
import JoinForm from './joinform.component'

class Register extends React.Component {
  registerService = new RegisterService();
  constructor(props){
      super(props);
      console.log('Register component constructor.');
      console.log(props);
      this.register = this.register.bind(this);
  }

  componentDidMount() {
      console.log('Mounting Set');
  }

  componentDidUpdate() {
      console.log('Updating Set');
  }

  validateAge(age) {
    return age > 12
  }

  register() {
    console.log(this.props);
    if (this.validateAge(this.props.age)) {
        this.registerService.register(this.props.username, this.props.password, this.props.role, this.props.age).then(
            (resp) => {
              // this.props.register(this.props.username, this.props.password, this.props.role)
              alert('Registration Successful')
            }).catch( (err) => {
                console.log('within the catch on the register')
                console.log(err.response)
                if (err.response.status === 500) {
                    alert('ERROR: Please attempt registration later')
                } else if (err.response.status === 400) {
                    alert('Username is taken, please choose another')
                }
            })
    } else {
        alert('ERROR: must be 13+ to join this site.')
    }
    
  }

  render() {
      console.log('rendering register')
      return (
          <>
            <JoinForm></JoinForm>
            <button className='btn btn-primary' onClick={ this.register }>Register</button>
          </>
      )
  }
}

function mapStateToProps(state) {
    console.log(state)
    const{ registerUser, registerPassword, role, registerAge } = state;
    return { username: registerUser, password: registerPassword, role: role, age: registerAge }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (username, password, role) => dispatch({ type: 'register', username: username, password: password })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
