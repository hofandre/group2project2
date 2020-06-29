import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

import UserService from '../services/user.service'

import { Navbar, Nav } from 'react-bootstrap';
import Login from './login.component';
import SetForm from './setform.component';



/*
Group 1: Expand MediaTable for different routes
    * Must be contingent on current route
    * videogame.service
    * movie.service
Group 2: Add Movie and Add VideoGame Components
Group 3: Renew/Checkin media components
Group 4: Edit Book
    * Retrieve specific book id from route
    * Generalize existing BookForm Component
    * Add put request to book service
*/
class Routing extends Component {
    render() {
        return <Router>
            <div>
                <Navbar id='navBar' bg='light' expand='lg' sticky='top'>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Link to='/sets'>Sets</Link>
                            <Link to='/addBook'>Nav element</Link>
                            <Link to='/movies'>Nav element</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Login></Login>
                </Navbar>
                {/*
                Nav elements
                <Route path='/sets' component={setTable}/>
                <Route path='/sets' component={setTable}/>
                */}
                <Route path='/sets' component={SetForm}/>
            </div>
        </Router>
    }
}

export default Routing;