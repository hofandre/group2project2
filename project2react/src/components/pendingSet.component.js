import React from 'react';
import SetService from '../services/set.service';
import { connect } from 'react-redux';

class PendingSet extends React.Component {
    setService = new SetService();
    constructor(props){
        super(props);
        this.approveSet = this.approveSet.bind(this);
        this.denySet = this.denySet.bind(this);
    }

    approveSet() {
        this.setService.approvePendingSet(this.props.pendingSet._id).then(() => {
            this.setService.deletePendingSet(this.props.pendingSet._id);
        });
    }
    denySet() {
        this.setService.deletePendingSet(this.props.pendingSet._id);
    }

    render() {
        return(
            <>
                <tr>
                    <th>{this.props.pendingSet.title}</th>
                </tr>
                <tr>
                    <td>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <td colSpan ='2'>
                                        Correct Option is {this.props.pendingSet.correct_option === 0 ? 'A' : 'B'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Option A</td>
                                    <td>Option B</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        // requires the png to exist in the img folder
                                        // <>
                                        // <td><img src={require(`../img/${this.props.pendingSet.paths[0]}`)} 
                                        //         alt={this.props.set.alt_texts[0]}></img>
                                        // </td>
                                        // <td><img src={require(`../img/${this.props.pendingSet.paths[1]}`)} 
                                        //         alt={this.props.set.alt_texts[1]}></img>
                                        // </td>
                                        // </>
                                    }
                                </tr>
                                <tr>
                                    <td>
                                        <button className='btn btn-success' onClick={ this.approveSet }>Approve set</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={ this.denySet }>Deny set</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        // updateAccuracy: (accuracy) => dispatch({type: 'updateAccuracy', accuracy: accuracy}),
        // queryComments: (comments) => dispatch({type: 'queryComments', comments: comments})
    }
}

export default connect(mapDispatchToProps)(PendingSet);