import React from 'react'
import PropTypes from 'prop-types'
import Set from './set.component'
import { connect } from 'react-redux';
import SetService from '../services/set.service'


/** Movie class to handle movie components. */
class SetTable extends React.Component {
    setService = new SetService();
    constructor(props) {
        console.log('setTable constructor')
        super(props);
    }
    /** Props are instantiated to create a controlled object. */
    // PropTypes = {
    //     ID: PropTypes.number.isRequired,
    //     correct_option: PropTypes.string.isRequired,
    //     title: PropTypes.string.isRequired,
    //     paths: PropTypes.array.isRequired,
    //     deck_tags: PropTypes.array.isRequired,
    //     keywords: PropTypes.array.isRequired
    // }

    /** componentDidMount records when construction occurs. */
    componentDidMount() {
        console.log('setTable mounted')
        this.setService.getSets().then(res => {
            this.props.querySets(res.data);
            console.log(res.data)
        })
    }

    /** componentDidUpdate records when update occurs. */
    componentDidUpdate() {
        console.log('Updating Sets')
    }

    search_bar() {
        return (
            <>
                <label>Set Search</label>
                <input type='text' className='form-control' name='setSearchTerm'></input>
            </>
        )
    }

    /** renders the videogame component.
     * @return {JSX} Returns an HTML template for sets
     */
    render() {
        console.log(this.props)
        return (
            <>  
                {this.search_bar}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Set Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.sets.map ?
                                this.props.sets.map((eachSet) => {
                                    return <Set key={eachSet._id} set={eachSet}></Set>
                                })
                                : <tr></tr>
                            }
                            <tr>
                                <td>
                                    Button goes here
                                </td>
                            </tr>
                        </tbody>
                    </table>
               </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const {displaySets} = state;
    return { sets: displaySets}
}
function mapDispatchToProps(dispatch) {
    return {
        querySets: (sets) => dispatch({type: 'querySets', sets: sets})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetTable);