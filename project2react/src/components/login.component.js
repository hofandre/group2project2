import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';
/** The Login class handles user login. */
class Login extends Component {

    /** */
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.register = this.register.bind(this);
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

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    register() {
      console.log(this.props);
      this.userService.register(this.props.username, this.props.password, this.props.role).then(
        (resp) => {
          this.props.dispatch( { type: 'register', user: resp.data } );
          this.login();
        }
      )
    }

    login() {
        console.log(this.props)
        this.userService.login(this.props.username, this.props.password).then(
            (resp) => {
                this.props.dispatch( { type: 'login', user: resp.data });
                this.loadSet();
            }
        )
    }

    logout(){
        this.userService.logout().then(
            () => {
                console.log('Logging out.')
                this.props.dispatch( { type: 'login', user: null} )
            }
        )
    }

    handleInput(e) {
        console.log(this.props)
        this.props.dispatch( { type: 'handleUsername', username: e.target.value } )
    }

    loadMedia() {
        this.renewService.getMedia(this.props.user.username).then(
            res => {
                console.log(res)
                this.props.dispatch({ type: 'loadMedia', media: res.data
            })})
    }

    getLoginForm() {
        return (
            <>
                <ul className = 'nav'>
                    <li className = 'nav-item'>Username: <input type="text"
                        value={this.props.username}
                        onChange={ this.handleInput }
                        onKeyDown={ (e) => this.handleKeyDown(e) }></input></li>
                    <li className = 'nav-item'><button className='btn btn-primary'
                        onClick={ this.login }>Login</button></li>
                </ul>
            </>
        )
    }

    displayUser() {
        return (
            <>
                <ul className = 'nav'>
                    <li className = 'nav-item'>
                        Welcome {this.props.user.role}: {this.props.user.username}
                    </li>
                    <li className = 'nav-item'><button className='btn btn-danger'
                        onClick={ this.logout }>Logout</button></li>
                </ul>
            </>
        )
    }

    render() {
        console.log('rendering login')
        if (this.props.user) {
            return this.displayUser()
        } else {
            return this.getLoginForm()
        }
    }
}

function mapStateToProps(state) {
    const {user, username} = state;
    return {user: user,
            username: username}
}

export default connect(mapStateToProps)(Login);
