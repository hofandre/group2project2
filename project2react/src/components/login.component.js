import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    userService = new UserService();
    

    componentDidMount() {
         this.userService.checkLogin().then(
             (resp) => {
                 this.props.dispatch( { type: 'login', user: resp.data })
             }
         )
    }

    login() {
        this.userService.login(this.props.username, this.props.password).then(
            (resp) => {
                console.log("logging in")
                console.log(resp);
                this.props.dispatch( { type: 'login', user: resp.data });
                this.props.dispatch({type: 'updateAccuracy', accuracy: this.props.user.accuracy });
            }
        )
    }

    logout(){
        this.userService.logout().then(
            () => {
                console.log('Logging out.')
                this.props.dispatch( { type: 'login', user: {username:'', password:'', role:''}, username:'', password:''} )
            }
        )
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.login();
        }
    }


    handleInput(e) {
        console.log(this.props)
        if (e.target.id === "username"){
        this.props.dispatch( {
                type: 'handleUsername',
                username: e.target.value,
            } ) 
        } else if (e.target.id === "password") {
            this.props.dispatch( {
                type: 'handlePassword',
                password: e.target.value,
            } )
        }
    }

    getLoginForm() {
        return (
            <>
                <ul className = 'nav'>
                    <li className = 'nav-item'>Username: <input type="text"
                        id="username"
                        value={this.props.username} 
                        onChange={ this.handleInput } ></input></li>
                    <li className = 'nav-item'>Password: <input type="password"
                        id="password"
                        value={this.props.password} 
                        onChange={ this.handleInput } ></input></li>
                    <li className = 'nav-item'><button className='btn btn-primary'
                        onClick={ this.login }>Login</button></li>
                </ul>
            </>
        )
    }

    displayUser() {
        console.log(this.props.accuracy)
        return (
            <>
                <ul className = 'nav'>
                    <li className = 'nav-item'>
                        Welcome {this.props.user.role}: {this.props.user.username}
                    </li>
                    <br></br>
                    <li className = 'nav-item' 
                        id='accuracyElement'>
                        | Accuracy: {this.props.accuracy.toFixed(2)}
                    </li>
                    <li className = 'nav-item'><button className='btn btn-danger'
                        onClick={ this.logout }>Logout</button></li>
                </ul>
            </>
        )
    }

    render() {
        console.log('rendering login')
        if (this.props.user.role !== '') {
            return this.displayUser()
        } else {
            return this.getLoginForm()
        }
    }
}

function mapStateToProps(state) {
    const {user, username, password, accuracy} = state;
    return {user: user,
            username: username,
            password: password,
            accuracy: accuracy}
}

export default connect(mapStateToProps)(Login);