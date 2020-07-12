import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeckService from '../services/deck.service';
import SetService from '../services/set.service';

class DeckForm extends Component {
    constructor(props) {
        super(props);
        this.addDeck = this.addDeck.bind(this);
        this.addSetToDeck = this.addSetToDeck.bind(this);
    }

    deckService = new DeckService();
    setService = new SetService();

    addDeck() {
        console.log("Attempting to add deck")
        var title = document.getElementById('deck-title').value
        if (title) {
        this.deckService.addDeck(title, this.props.deckSets).then(
            this.clearScreen()
        )
        } else {
            alert("Deck Needs a Title")
        }
    }

    addSetToDeck(e) {
        var currentSets = this.props.deckSets
        currentSets.push(e.target.id)
        this.props.addSetToDeckSets(currentSets)
    }

    componentDidMount() {
        this.setService.getSets().then(
            (resp) => {
                this.props.querySets(resp.data)
            }
        )
    }

    clearScreen() {
        document.getElementById("deck-title").value = ""
        var inputs = document.getElementsByClassName("checkbox")
        for (var input of inputs) {
            input.checked = false
        }
    }

    render() {
        return (
            <>
            {
            (this.props.user.usertype ==='admin' || this.props.user.usertype === 'moderator')?
                <div>
                    <h1>Create a Deck of Sets</h1>
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

                {
                    this.props.displaySets.map ?
                    <div className="container">
                        <table>
                            <thead>
                                <td>Set ID</td>
                                <td>Title</td>
                                <td>Include Set?</td>
                            </thead>
                        {
                            this.props.displaySets.map((eachSet) => {
                                return (
                                    this.props.user.usertype === 'admin' || this.props.user.usertype === 'moderator'?
                                    <tr key={eachSet._id}>
                                        <td>
                                            <span>{eachSet._id}</span>
                                        </td>
                                        <td>
                                            <span>{eachSet.title}</span>
                                        </td>
                                        <td>
                                            <input type="checkbox" className="checkbox" id={eachSet._id} onClick={this.addSetToDeck}/>
                                        </td>
                                    </tr>
                                    :
                                    null
                                )
                            })
                        }
                        </table>
                    </div>
                    :
                    null
                }
                </div>
            : null
            }
            </>
        )
    }
}

function mapStateToProps(state) {
    const {user, displaySets, deckSets} = state;
    return {user: user,
            displaySets: displaySets,
            deckSets: deckSets
        }
}

function mapDispatchToProps(dispatch) {
    return {
        querySets: (sets) => dispatch({type: 'querySets', sets: sets}),
        addSetToDeckSets: (sets) => dispatch({type:'addSetToDeck', sets: sets})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckForm)
