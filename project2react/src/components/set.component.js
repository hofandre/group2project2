import React from 'react'
import SetService from '../services/set.service'

class Set extends React.Component {
    setService = new SetService();
    constructor(props){
        super(props)
    }
    componentDidMount() {
        console.log('Mounting Set')
    }

    vote(abString){
        this.setService.voteAorB(this.props.username, this.props.setId, abString)
    }

    componentDidUpdate() {
        console.log('Updating Set')
    }

    render() {
        console.log('rendering a set')
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
                                <tr>
                                    <td><button> className = 'nav-item'><button className='btn btn-primary'
                                        onClick={ this.vote('a') }>Vote a</button></button></td>
                                    <td><button className = 'nav-item'><button className='btn btn-primary'
                                        onClick={ this.vote('b') }>Vote b</button></button></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </td>
                </tr>
            </>
        )
    }
}

export default Set;