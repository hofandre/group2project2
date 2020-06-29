import React from 'react'
import PropTypes from 'prop-types'

/** Movie class to handle movie components. */
class Set extends React.Component {

    /** Props are instantiated to create a controlled object. */
    PropTypes = {
        ID: PropTypes.string.isRequired,
        correctOption: PropTypes.string.isRequired,
        inCorrectOption: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        sourcePath: PropTypes.string.isRequired,
        deckTags: PropTypes.string.isRequired,
        keywords: PropTypes.string.isRequired
    }

    /** componentDidMount records when construction occurs. */
    componentDidMount() {
        console.log('Mounting Sets')
    }

    /** componentDidUpdate records when update occurs. */
    componentDidUpdate() {
        console.log('Updating Sets')
    }

    /** renders the videogame component.
     * @return {JSX} Returns an HTML template for sets
     */
    render() {
        console.log('Sets Render: '+this.props.set.id)
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