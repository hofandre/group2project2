import React from 'react';
import SetService from '../services/set.service';

class PendingSet extends React.Component {
    setService = new SetService();
    constructor(props){
        super(props);
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
                            </tbody>
                        </table>
                    </td>
                </tr>
            </>
        )
    }
}

export default (PendingSet);