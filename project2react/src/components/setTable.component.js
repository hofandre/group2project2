import React from 'react'
import Set from './set.component'
import { connect } from 'react-redux';
import SetService from '../services/set.service'
/** Movie class to handle movie components. */
class SetTable extends React.Component {
    setService = new SetService();
    constructor(props) {
        console.log('setTable constructor')
        console.log(props)
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.searchSets = this.searchSets.bind(this);
        this.allSets = this.allSets.bind(this);
        this.vote = this.vote.bind(this);
    }
    /** componentDidMount records when construction occurs. */
    componentDidMount() {
        console.log('setTable mounted')
    }
    /** componentDidUpdate records when update occurs. */
    componentDidUpdate() {
        console.log('Updating Sets')
        console.log(this.props)
    }
    searchSets() {
        this.setService.getSetByID(this.props.setSearchCriteria).then(res => {
            console.log(res)
            const set_list = [res.data]
            this.props.querySets(set_list);
        }).catch(res => {
            alert(`The set id you have entered is out of bounds, please try a smaller number.`)
        })
    }
    allSets() {
        this.setService.getSets().then(res => {
            this.props.querySets(res.data);
        })
    }
    validate_id(set_id) {
        if(isNaN(set_id)) {
            return false
        } else if (parseInt(set_id) < 1) {
            return false
        } else {
            return true
        }
    }
    handleInput(event) {
        const search_term = event.target.value
        if (this.validate_id(search_term))
        {
            this.props.setSearch(search_term)
        } else {
            alert(`The id you've entered is invalid.\nValid ids begin at 1`)
        }
    }
    vote(abString){
        this.setService.voteAorB(this.props.username, this.props.setId, abString)
    }
    /** renders the videogame component.
     * @return {JSX} Returns an HTML template for sets
     */
    render() {
        console.log('Render called')
        return (
            <>  <div className='container'>
                    <label htmlFor='setSearchTerm'>Set ID Search</label>
                    <input type='text' className='form-control' name='setSearchTerm'
                        value={this.props.setSearchCriteria || ''}
                        onChange={ this.handleInput }
                    ></input>
                    <button className='btn btn-primary'
                    onClick={ this.searchSets }>Search</button>
                    <button className='btn btn-primary'
                    onClick={ this.allSets }>View all sets</button>
                </div>
                <div className='container'>
                    <table className='table'>
                        <tbody>
                            {
                                this.props.sets.map ?
                                this.props.sets.map((eachSet) => {
                                    return <Set key={eachSet._id} set={eachSet}></Set>
                                })
                                : <tr></tr>
                            }
                              <tr>
                                    <td><button> className = 'nav-item'><button className='btn btn-primary'
                                        onClick={ this.vote('a') }>Vote a</button></button></td>
                                    <td><button className = 'nav-item'><button className='btn btn-primary'
                                        onClick={ this.vote('b') }>Vote b</button></button></td>
                                </tr>
                        </tbody>
                    </table>
               </div>
            </>
        )
    }
}
function mapStateToProps(state) {
    const {displaySets, displaySetCriteria} = state;
    return { sets: displaySets,
             setSearchCriteria: displaySetCriteria}
}
function mapDispatchToProps(dispatch) {
    return {
        querySets: (sets) => dispatch({type: 'querySets', sets: sets}),
        setSearch: (setSearchCriteria) => dispatch({type: 'setSearch', setSearchCriteria: setSearchCriteria })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetTable);