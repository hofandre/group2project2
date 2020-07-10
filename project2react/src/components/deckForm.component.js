import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button} from 'react-bootstrap';
import { useRouteMatch } from 'react-router';
import DeckService from '../services/deck.service';

class DeckForm extends Component {
    constructor(props) {
        super(props);
        this.addDeck = this.addDeck.bind(this);
    }

    deckService = new DeckService();

    addDeck() {
        var title = "Deck from Page Axios Test"
        var sets = [1, 2]
        this.deckService.addDeck(title, sets).then(alert("Axios works"))
    }

    render() {
        return (
            <>
                <div>
                        <label>Title</label><br></br>
                        <input type="text" id="deck-title" placeholder="Title"></input><br></br>
                        <label>Sets</label><br></br>
                        <div id="new-deck-sets">
                            {
                                this.props.deckSets.map ?
                                this.props.deckSets.map((set) => {
                                    return <br></br>
                                })
                                :
                                null
                            }
                        </div>
                        <button onClick={this.addDeck}>Submit</button>
                   
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const {user, deckSets} = state;
    return {user: user,
            deckSets: deckSets
        }
}

export default connect(mapStateToProps)(DeckForm)