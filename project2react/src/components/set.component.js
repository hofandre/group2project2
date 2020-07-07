import React from 'react';
import SetService from '../services/set.service';
import { connect } from 'react-redux';

class Set extends React.Component {
    setService = new SetService();
    constructor(props){
        super(props);
        console.log('setComponent constructor')
        console.log(props)
        this.voteA = this.voteA.bind(this);
        this.voteB = this.voteB.bind(this);

    }

    voteA(){
        console.log('voteOne was clicked');
        this.setService.vote(this.props.username, this.props.set._id, 1).then( res => {
            console.log('post was succesful');
            console.log(res);
        })
        
    }
    voteB(){
        console.log('voteTwo was clicked');
        this.setService.vote(this.props.username, this.props.set._id, 2).then( res => {
            console.log('post was succesful');
            console.log(res);
        })
        
    }
    componentDidMount() {
        console.log('Mounting Set')
    }

    componentDidUpdate() {
        console.log('Updating Set')
    }



    displayAccuracy() {
        const accuracy = this.props.set.accuracy
        console.log(this.props.set)
        console.log(accuracy)
        console.log('where are my logs at?')
        console.log((accuracy < .35))
        console.log(((accuracy < .65) && (accuracy >= .35)))
        console.log((accuracy >= .65))
        const outputString = `Global First Time User Accuracy: ${this.props.set.accuracy*100}%`
        if (accuracy < .35) {
            return (
                <div className='alert alert-danger'>
                    {outputString}
                </div>
            )
        } else if ((accuracy < .65) && (accuracy >= .35)) {
            return (
                <div className='alert alert-warning'>
                    {outputString} 
                </div>
            )
        } else if (accuracy >= .65){
            return (
                <div className='alert alert-success'>
                    {outputString}
                </div>
            )
        }
    }

    render() {
        console.log('rendering a set')
        console.log(this.props.set)
        return (
            <>
                <tr>
                    <th>{this.props.set.title}</th>
                </tr>
                <tr>
                    <td>
                    {
                        this.displayAccuracy()
                    }                        
                    </td>
                </tr>
                <tr>
                    <td>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <td>Option A</td>
                                    <td>Option B</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src={require(`../img/${this.props.set.paths[0]}`)} 
                                            alt={this.props.set.alt_texts[0]}></img>
                                    </td>
                                    <td><img src={require(`../img/${this.props.set.paths[1]}`)} 
                                            alt={this.props.set.alt_texts[1]}></img>
                                    </td>
                                </tr>
                                <tr>
                                    <td><button className='btn btn-primary'
                                        onClick={ this.voteA }>Vote a</button></td>
                                    <td><button className='btn btn-primary'
                                        onClick={ this.voteB }>Vote b</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </>
        )
    }
}
function mapStateToProps(state) {
    const {username} = state;
    return { username: username}
}

function mapDispatchToProps(dispatch) {
    return {
        vote: () => dispatch({type: 'vote'})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Set);