import React from 'react'
import Set from './set.component'
import './settable.css'
import { connect } from 'react-redux';
import SetService from '../services/set.service'

class SetTable extends React.Component {
    setService = new SetService();
    constructor(props) {
        console.log('setTable constructor')
        console.log(props)
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.searchSets = this.searchSets.bind(this);
        this.allSets = this.allSets.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
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
    idSearch() {
        if (this.validate_id(this.props.setSearchCriteria)) {
            this.setService.getSetByID(this.props.setSearchCriteria).then(res => {
                console.log(res)
                const set_list = [res.data]
                this.props.querySets(set_list);
            }).catch(res => {
            
                alert(`The set id you have entered is out of bounds, please try a smaller number.`)
            
            })
        } else {
            alert(`The id you've entered is invalid.\nValid ids begin at 1`)
        }
        
    }

    keywordSearch() {
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
            }).catch(res => {
            
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
        console.log('Render called')
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
                                    return <Set key={eachSet._id} set={eachSet}></Set>
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
    const {displaySets, displaySetCriteria, displaySearchTerm} = state;
    return { sets: displaySets, 
             setSearchCriteria: displaySetCriteria,
             setSearchTerm: displaySearchTerm}
}
function mapDispatchToProps(dispatch) {
    return {
        querySets: (sets) => dispatch({type: 'querySets', sets: sets}),
        setSearch: (setSearchCriteria) => dispatch({type: 'setSearch', setSearchCriteria: setSearchCriteria }),
        setTerm: (searchTerm) => dispatch({type: 'searchTerm', setSearchTerm: searchTerm})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetTable);