import React from 'react'
import Set from './set.component'
import './settable.css'
import { connect } from 'react-redux';
import SetService from '../services/set.service'

class SetTable extends React.Component {
    setService = new SetService();
    constructor(props) {
        console.log('setTable constructor')
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.searchSets = this.searchSets.bind(this);
        this.allSets = this.allSets.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.deleteSet = this.deleteSet.bind(this);
    }
    /** componentDidMount records when construction occurs. */
    componentDidMount() {
        console.log('setTable mounted')
    }
    /** componentDidUpdate records when update occurs. */
    componentDidUpdate() {
        console.log('Updating Sets')
    }

    deleteSet(event) {
        const setID = event.target.id.split('_')[1]
        console.log(setID)
        let choice = window.confirm('Are you sure you want to delete a set? This cannot be undone.')
        console.log(choice)
        if (choice) {
            this.setService.deleteSetByID(setID).then( res => {
                this.reloadSets()
                return
            }).catch((res) => {
                
                console.log('delete set catch called')
                console.log(res)
                alert('Set has failed to delete, please check the database')
            }   
            )
        }
    }

    reloadSets() {
        console.log('reload sets called')
        console.log(this.props.lastSearch)
        if (this.props.lastSearch.type === 'ALL') {
            return this.allSets()
        } else if (this.props.lastSearch.type === 'id') {
            this.props.setTerm('id')
            this.props.setSearch(this.props.lastSearch.param)
            return this.idSearch()
        } else if (this.props.lastSearch.type === 'keyword') {
            this.props.setTerm('keyword')
            this.props.setSearch(this.props.lastSearch.param)
            return this.keywordSearch()
        }
    }

    idSearch() {
        if (this.validate_id(this.props.setSearchCriteria)) {
            this.setService.getSetByID(this.props.setSearchCriteria).then(res => {
                const set_list = [res.data]
                this.props.querySets(set_list);
                this.props.updateLastSearch({type: 'id', param: this.props.setSearchCriteria})
            }).catch(res => {
                this.props.querySets({});
                alert(`The set id you have entered is out of bounds, please try a smaller number.`)

            })
        } else {
            alert(`The id you've entered is invalid.\nValid ids begin at 1`)
        }

    }

    keywordSearch() {
        console.log('keyword search called')
        console.log(this.props.setSearchCriteria)
        if (this.validate_keyword(this.props.setSearchCriteria)) {
            this.setService.getSetsByKeyword(this.props.setSearchCriteria).then(res => {
                if (Array.isArray(res.data))
                {
                    this.props.querySets(res.data);

                }
                else {
                    const set_list = [res.data]
                    this.props.querySets(set_list);
                }
                this.props.updateLastSearch({type: 'keyword', param: this.props.setSearchCriteria})
            }).catch(res => {
                this.props.querySets({});
                alert(`The keyword you've entered does not match any sets.`)

            })
        } else {
            alert(`Keywords cannot be empty, please try again.`)
        }

    }

    searchSets() {
        if (this.props.setSearchTerm === 'id') {
            this.idSearch()
        } else if (this.props.setSearchTerm === 'keyword') {
            this.keywordSearch()
        }

    }
    allSets() {
        this.setService.getSets().then(res => {
            // this.updateAccuracies(res.data)
            this.props.querySets(res.data);
            this.props.updateLastSearch({type: 'ALL', param: ''})

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

    validate_keyword(keyword) {
        return !(keyword === '')
    }

    handleInput(event) {
        this.props.setSearch(event.target.value)
    }

    handleTermChange (event) {
        this.props.setTerm(event.target.value)
    }

    /** renders the videogame component.
     * @return {JSX} Returns an HTML template for sets
     */
    render() {
        return (
            <>  <div className='container'>
                    <h3>Set Search</h3>
                    <div className='form-row' id='searchForm'>
                        <input type='text' className='form-control' name='setSearchTerm'
                            value={this.props.setSearchCriteria || ''}
                            onChange={ this.handleInput }
                            id='setSearchBar'
                        ></input>
                        <select className='form-control' name='searchType'
                            id='setSearchType'
                            value={this.props.setSearchTerm}
                            onChange={this.handleTermChange}
                        >
                            <option value='id'>Set ID</option>
                            <option value='keyword'>Keyword</option>
                        </select>
                    </div>
                    <br></br>
                    <button className='btn btn-primary'
                    onClick={ this.searchSets }>Search</button>
                    <button className='btn btn-primary'
                    onClick={ this.allSets }>View all sets</button>
                </div>
                <div className='container'>
                    <br></br>
                    <table className='table'>
                        <tbody>
                            {
                                this.props.sets.map ?
                                this.props.sets.map((eachSet) => {
                                    return (
                                    this.props.user.usertype === 'admin' ?
                            
                                        <tr>

                                            <Set key={eachSet._id} set={eachSet}></Set>
                                            <button className='btn btn-danger' 
                                            id={'del_'+eachSet._id}
                                            onClick={this.deleteSet }>Delete this set</button>
                                        </tr>
                                    :   <tr>
                                            <Set key={eachSet._id} set={eachSet}></Set>
                                        </tr> 
                                    )
                                })
                                : <tr></tr>
                            }
                        </tbody>
                    </table>
               </div>
            </>
        )
    }
}
function mapStateToProps(state) {
    const {displaySets, displaySetCriteria, displaySearchTerm, user, lastSearchMade} = state;
    return { sets: displaySets,
             setSearchCriteria: displaySetCriteria,
             setSearchTerm: displaySearchTerm,
             user: user,
             lastSearch: lastSearchMade}
}
function mapDispatchToProps(dispatch) {
    return {
        querySets: (sets) => dispatch({type: 'querySets', sets: sets}),
        setSearch: (setSearchCriteria) => dispatch({type: 'setSearch', setSearchCriteria: setSearchCriteria }),
        setTerm: (searchTerm) => dispatch({type: 'searchTerm', setSearchTerm: searchTerm}),
        updateLastSearch: (searchDetails) => dispatch({type: 'updateSearch', searchMade: searchDetails})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetTable);
