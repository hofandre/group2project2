import React from 'react'

class Set extends React.Component {

    componentDidMount() {
        console.log('Mounting Set')
    }

    componentDidUpdate() {
        console.log('Updating Set')
    }

    render() {
        console.log('Book Render: '+this.props.set.id)
        return (
            <>
                <tr>
                    <td>{this.props.set.id}</td>
                    <td>{this.props.set.title}</td>
                </tr>
            </>
        )
    }
}

export default Set;