import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Login from './login.component'

import { Navbar, Nav } from 'react-bootstrap';
import SetForm from './setTable.component';
import UserTable from './usersList.component'




class Routing extends Component {
    render() {
        return <Router>
            <div>
                <Navbar id='navBar' bg='light' expand='lg' sticky='top'>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Link to='/sets'>Sets</Link>
                            <Link to='/users'>Users</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Login></Login>
                </Navbar>
                <Route path='/sets' component={SetForm}/>
                <Route path='/users' component={UserTable}/>
            </div>
        </Router>
    }
}

export default Routing;