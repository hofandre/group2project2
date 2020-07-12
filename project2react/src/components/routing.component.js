import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './login.component';
import Register from './register.component';
import { Navbar, Nav } from 'react-bootstrap';
import SetForm from './setTable.component';
import UserTable from './usersList.component';
import Index from './home.component';


class Routing extends Component {
    render() {
        return <Router>
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/home">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/sets">Sets</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                    </Nav>
                    <Login></Login>
                </Navbar>
            </>

                <Route path='/sets' component={SetForm}/>
                <Route path='/register' component={Register}/>
                <Route path='/users' component={UserTable}/>
                <Route path='/home' component={Index}/>
        </Router>

    }
}

export default Routing;