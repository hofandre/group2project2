import React from 'react'
import SetService from '../services/set.service'

class Set extends React.Component {

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
                                
                            </tbody>
                        </table>
                    </td>
                </tr>
            </>
        )
    }
}

export default Set;