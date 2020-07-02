import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';

class Login extends Component {

<<<<<<< HEAD
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
                 //this.loadMedia();
             }
         )
    }

    login() {
        this.userService.login(this.props.username, this.props.password).then(
            (resp) => {
                console.log(resp)
                this.props.dispatch( { type: 'login', user: resp.data })
            }
        )
    }

    logout(){
        this.userService.logout().then(
            () => {
                console.log('Logging out.')
                this.props.dispatch( { type: 'login', user: null, username:'', password:''} )
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
=======
	/**
		Creates props for handling user input, keydown event, login,
		and logout function.
		@param {dict} props contains the Login state.
	*/
	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	userService = new UserService();

	/**
		componentDidMount() handles mounting the userService checkLogin method.
	*/
	componentDidMount() {
		this.userService.checkLogin().then(
			(resp) => {
				this.props.dispatch( { type: 'login', user: resp.data })
			}
		)
	}

	/**
		handleKeyDown() handles key down event trigger.
	*/
	handleKeyDown(e) {
		if (e.key === 'Enter') {
			this.login();
		}
	}

	checkLogin() {
		console.log(this.props)
		this.userService.checkLogin(this.props).then(

		)
	}

	/**
		login() handles dispatching an HTTP POST request to the user service,
		creates a promise using a lambda function, which awaits with
		awaits with bated breath the response from the server.
	*/
	login() {
		console.log(this.props)
		this.userService.login(this.props).then(
			(response) => {
				this.props.dispatch( { type: 'login', user: response.data })
			}
		)
	}

	/**
		logout() handles dispatching an HTTP DELETE request to the user service,
		creates a promise using a lambda function, which awaits the
		toll of the bell from the server ending your session.
	*/

	logout(){
		this.userService.logout().then(
			() => {
				console.log('Logging out.')
				this.props.dispatch( { type: 'login', user: null} )
			}
		)
	}

	/**
		handleInput(e) handles user input by dispatching an event to the
		handleUser method, which consists of the three fields within the
		User react component class. This anticipates three input fields
		for account creation and two input fields for account login.
		@param e {event} Arbitrary JavaScript may trigger on any input.
	*/

	handleInput(e) {
		console.log(this.props)
		this.props.dispatch( { type: 'handleUser', user: e.target.value } )
	}


	/**
		getLoginForm() template for user login data, which contains a
		username, password, and login field.
		@return {JSX} JavaScript template for user login.
	*/

	getLoginForm() {
		return (
			<>
				<ul className = 'nav'>
					<li className = 'nav-item'>Username: <input type="text"
						value={this.props.username}
						onChange={ this.handleInput }
						onKeyDown={ (e) => this.handleKeyDown(e) }></input></li>
					<li className = 'nav-item'>Password: <input type="password"
						value={this.props.password}
						onChange={ this.handleInput }
						onKeyDown={ (e) => this.handleKeyDown(e) }></input></li>
					<li className = 'nav-item'><button className='btn btn-primary'
						onClick={ this.login }>Login</button></li>
				</ul>
			</>
		)
	}

	/**
		displayUser() template for displaying the user's data, which contains
		a username and role. This should be displayed at the top right of the
		web page, and may later provide access to a user profile area.
	*/

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

	/**
		render() executes the render operation for the login component.
		If the user is logged in, then the user's login information will
		be displayed. If the user is logged out, then the login form will
		be displayed.
	*/

	render() {
		console.log('rendering login')
		if (this.props.user) {
			return this.displayUser()
		} else {
			return this.getLoginForm()
		}
	}
>>>>>>> 26c263bb7e8415b82ee8ce593490ac1c1b9f563f
}

function mapStateToProps(state) {
    const {user, username, password} = state;
    return {user: user,
            username: username,
            password: password}
}

export default connect(mapStateToProps)(Login);