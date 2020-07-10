import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Login from './login.component'
import Register from './register.component'
import StatTable from './statistics.component'
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import SetForm from './setTable.component';
import UserTable from './usersList.component';
import DeckForm from './deckForm.component';


class Routing extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return <Router>
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/sets">Sets</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
<<<<<<< HEAD
                    <Nav.Link href='/users'>Users</Nav.Link>
                    <Nav.Link href="/decks">Decks</Nav.Link>
=======
                    {
                        this.props.user.usertype === 'moderator' ||
                        this.props.user.usertype === 'admin' ?
                        <>
                            <Nav.Link href='/users'>Users</Nav.Link>
                            <Nav.Link href='/stats'>Site Statistics</Nav.Link>
                        </>
                        : <></>
                    }
>>>>>>> 841752ffa20a8f1d45111b50473858d8cc0776bc
                    </Nav>
                    <Login></Login>
                </Navbar>
                </>
                <Route path='/sets' component={SetForm}/>
                <Route path='/register' component={Register}/>
                <Route path='/users' component={UserTable}/>
<<<<<<< HEAD
                <Route path='/decks' component={DeckForm}/>
=======
                <Route path='/stats' component={StatTable}/>
>>>>>>> 841752ffa20a8f1d45111b50473858d8cc0776bc
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