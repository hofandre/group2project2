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

  register() {
    console.log(this.props);
    this.registerService.register(this.props.username, this.props.password).then(
      (resp) => {
        // this.props.register(this.props.username, this.props.password, this.props.role)
        alert('Registration Successful')
      })
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
    const{ registerUser, registerPassword } = state;
    return { username: registerUser, password: registerPassword }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (username, password, role) => dispatch({ type: 'register', username: username, password: password })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
