import React from 'react';
import SetService from '../services/set.service';
import { connect } from 'react-redux';

class Set extends React.Component {
    setService = new SetService();
    constructor(props){
        super(props);
        console.log('setComponent constructor')
        console.log(props)
        this.handleInput = this.handleInput.bind(this);
        this.voteA = this.voteA.bind(this);
        this.voteB = this.voteB.bind(this);
        this.comment = this.comment.bind(this);
    }

    voteA(){
        console.log('voteOne was clicked');
        this.setService.vote(this.props.user.username, this.props.set._id, 1).then( res => {
            console.log('post was succesful');
            console.log(res);
            if(this.props.set.correct_option === 1)
            {
                alert('Your vote was right');
            }
            else{
                alert('Your vote was wrong');
            }
        })
        
    }
    voteB(){
        console.log('voteTwo was clicked');
        this.setService.vote(this.props.user.username, this.props.set._id, 2).then( res => {
            console.log('post was succesful');
            console.log(res);
            if(this.props.set.correct_option === 2)
            {
                alert('Your vote was right');
            }
            else{
                alert('Your vote was wrong');
            }
        })
        
    }

    handleInput(e) {
        console.log(this.props)
        this.props.dispatch( {
            type: 'handleComment',
            comment: e.target.value
        } )
    }
    comment() {
        console.log('comment button clicked')
        console.log(this.props.comment)
        this.setService.comment(this.props.user.username, this.props.set._id, this.props.comment)
    }

    componentDidMount() {
        console.log('Mounting Set')
    }

    componentDidUpdate() {
        console.log('Updating Set')
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
                                {this.props.user ?
                                    <>
                                        <tr>
                                            <td><button className='btn btn-primary'
                                                onClick={ this.voteA }>Vote a</button></td>
                                            <td><button className='btn btn-primary'
                                                onClick={ this.voteB }>Vote b</button></td>
                                        </tr>
                                        <tr>
                                        <td colSpan='2'>
                                            <textarea rows='5' cols='100' id='comment' value={this.props.comment} onChange={ this.handleInput }></textarea>
                                        </td>
                                        </tr>
                                        <tr>
                                            <td colSpan='2'>
                                                <button className='btn btn-dark' onClick={ this.comment }>Comment</button>
                                            </td>
                                        </tr>
                                    </>
                                    : <tr></tr>
                                }

                            </tbody>
                        </table>
                    </td>
                </tr>
            </>
        )
    }
}
function mapStateToProps(state) {
    console.log(state)
    const {user, comment} = state;
    console.log(user)
    return { user: user,
             comment: comment }
}
// function mapDispatchToProps(dispatch) {
//     return {
//         vote: () => dispatch({type: 'vote'})
//     }
// }
export default connect(mapStateToProps)(Set);
