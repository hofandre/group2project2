import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './login.component'
import Register from './register.component'
import Upload from './upload.component'

import StatTable from './statistics.component'
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import SetForm from './setTable.component';
import UserTable from './usersList.component';
import DeckForm from './deckForm.component';
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
                    <Nav.Link href='/users'>Users</Nav.Link>
                    <Nav.Link href="/decks">Decks</Nav.Link>
                    <Nav.Link href='/upload'>Upload</Nav.Link>
                    {
                        this.props.user.usertype === 'moderator' ||
                        this.props.user.usertype === 'admin' ?
                        <>
                            <Nav.Link href='/users'>Users</Nav.Link>
                            <Nav.Link href='/stats'>Site Statistics</Nav.Link>
                        </>
                        : <></>
                    }
                    </Nav>
                    <Login></Login>
                </Navbar>
            </>
                <Route path='/home' component={Index}/>
                <Route path='/sets' component={SetForm}/>
                <Route path='/register' component={Register}/>
                <Route path='/upload' component={Upload}/>
                <Route path='/users' component={UserTable}/>
                <Route path='/decks' component={DeckForm}/>
                <Route path='/stats' component={StatTable}/>
            </Router>
    }
}
function mapStateToProps(state) {
    const {user} = state;
    return {
        user: user
    }
}
export default connect(mapStateToProps)(Routing);
