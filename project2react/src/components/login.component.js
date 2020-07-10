import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';
import { Form, Button, Col, Nav, Navbar} from 'react-bootstrap';

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
                this.props.dispatch( { type: 'login', user: {username:'', password:'', usertype:''}, username:'', password:''} )
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
                <Form>
                    <Form.Row>
                        <Col>
                        <Form.Control 
                            id="username"
                            placeholder="Username"
                            value={this.props.username} 
                            onChange={ this.handleInput } />
                        </Col>
                        <Col>
                        <Form.Control 
                            id="password"
                            placeholder="Password"
                            value={this.props.password} 
                            onChange={ this.handleInput }
                             />
                        </Col>
                        <Col>
                        <Button
                            onClick={ this.login }  
                            className="btn btn-primary">
                            Login
                        </Button>
                        </Col>
                    </Form.Row>
                    </Form>
            </>
        )
    }

    displayUser() {
        console.log(this.props.accuracy)
        return (
            <>
                <Nav bsstyle="default" style={{width: "550px"}}>
                    <Col>
                        <Form />
                            <Navbar.Text >
                                Welcome {this.props.user.role}: {this.props.user.username}  
                            </Navbar.Text>
                        
                    </Col>
                    <Col>
                        <Form  />
                            <Navbar.Text>
                                Accuracy: {this.props.accuracy.toFixed(2)}
                            </Navbar.Text>
                        
                    </Col>
                    <Col>
                        <Button
                            onClick={ this.logout }  
                            className="btn btn-danger">
                            Logout
                        </Button>
                    </Col>
                </Nav>
            </>
        )
    }

    render() {
        console.log('rendering login')
        if (this.props.user.usertype !== '') {
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