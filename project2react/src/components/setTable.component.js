import React from 'react'
import Set from './set.component'
import PendingSet from './pendingSet.component'
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
        this.allPendingSets = this.allPendingSets.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.deleteSet = this.deleteSet.bind(this);
        this.approveSet = this.approveSet.bind(this);
        this.denySet = this.denySet.bind(this);
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

    approveSet(event) {
        const setID = event.target.id.split('_')[1]
        // event.persist(event)
        this.setService.approvePendingSet(setID).then(() => {
            this.setService.deletePendingSet(setID).then( res => {
                this.reloadSets()
                return
            }).catch((res) => {
                console.log('delete set catch called')
                console.log(res)
                alert('Set has failed to delete, please check the database')
            }   
            )
        });
    }
    denySet(event) {
        const setID = event.target.id.split('_')[1]
        console.log(setID)
        let choice = window.confirm('Are you sure you want to delete a set? This cannot be undone.')
        console.log(choice)
        if (choice) {
            this.setService.deletePendingSet(setID).then( res => {
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
        } else if (this.props.lastSearch.type === 'ALLPEND') {
            return this.allPendingSets()
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
            this.props.unqueryPendingSets();
            this.props.querySets(res.data);
            this.props.updateLastSearch({type: 'ALL', param: ''});
        })
    }
    allPendingSets() {
        console.log('grab all pending sets')
        this.setService.getPendingSets().then(res => {
            this.props.unquerySets();
            this.props.queryPendingSets(res.data);
            this.props.updateLastSearch({type: 'ALLPEND', param: ''});
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
                    {
                        this.props.user.usertype === 'admin' || this.props.user.usertype === 'moderator' ?
                        // maybe a button for searching the pending sets as well
                        <button className='btn btn-primary'
                        onClick={ this.allPendingSets }>View all pending sets</button> :
                        <></>
                    }
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
                                            <td>
                                                <button className='btn btn-danger' 
                                                id={'del_'+eachSet._id}
                                                onClick={ this.deleteSet }>Delete this set</button>
                                            </td>
                                            <td>
                                                <Set key={eachSet._id} set={eachSet}></Set>
                                            </td>
                                        </tr>
                                        : <Set key={eachSet._id} set={eachSet}></Set>
                                    )
                                })
                                : <tr></tr>
                            }
                            {
                                this.props.pendingSets.map ?
                                this.props.pendingSets.map((eachSet) => {
                                    return (
                                        <>
                                            <tr>
                                                <td style={{width: '15%'}}>
                                                    <button className='btn btn-success' id={'app_'+eachSet._id} onClick={ this.approveSet }>Approve set</button>
                                                </td>
                                                <td style={{width: '15%'}}>
                                                    <button className='btn btn-danger' id={'del_'+eachSet._id} onClick={ this.denySet }>Deny set</button>
                                                </td>
                                                <td style={{width: '70%'}}>
                                                    <PendingSet key={eachSet._id} pendingSet={eachSet}></PendingSet>
                                                </td>
                                            </tr>
                                        </>
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
    const {displaySets, displayPendingSets, displaySetCriteria, displaySearchTerm, user, lastSearchMade} = state;
    return { sets: displaySets,
             pendingSets: displayPendingSets,
             setSearchCriteria: displaySetCriteria,
             setSearchTerm: displaySearchTerm,
             user: user,
             lastSearch: lastSearchMade}
}
function mapDispatchToProps(dispatch) {
    return {
        querySets: (sets) => dispatch({type: 'querySets', sets: sets}),
        unquerySets: () => dispatch({type: 'unquerySets', sets: null}),
        queryPendingSets: (pendingSets) => dispatch({type: 'queryPendingSets', pendingSets: pendingSets}),
        unqueryPendingSets: () => dispatch({type: 'unqueryPendingSets', pendingSets: null}),
        setSearch: (setSearchCriteria) => dispatch({type: 'setSearch', setSearchCriteria: setSearchCriteria }),
        setTerm: (searchTerm) => dispatch({type: 'searchTerm', setSearchTerm: searchTerm}),
        updateLastSearch: (searchDetails) => dispatch({type: 'updateSearch', searchMade: searchDetails})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetTable);
