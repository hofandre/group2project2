import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
import SetForm from './setTable.component';




class Routing extends Component {
    render() {
        return <Router>
            <div>
                <Navbar id='navBar' bg='light' expand='lg' sticky='top'>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Link to='/sets'>Sets</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Route path='/sets' component={SetForm}/>
            </div>
        </Router>
    }
}

export default Routing;