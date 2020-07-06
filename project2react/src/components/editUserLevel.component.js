import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';

class EditUserLevel extends Component {

    constructor(props) {
        super(props);
    }
    userService = new UserService();
    

    componentDidMount() {
        
    }

    render() {

    }

}



function mapStateToProps(state) {
    const {user, username, password} = state;
    return {user: user,
            username: username,
            password: password}
}

export default connect(mapStateToProps)(Login);