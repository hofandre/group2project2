import React from 'react'
import PropTypes from 'prop-types'

/** User class to handle user components. */
class User extends React.Component {

	/** Props are instantiated to create a controlled object. */
	PropTypes = {
		username: PropTypes.string,
		password: PropTypes.string,
		role: PropTypes.string,
	}

	/** componentDidMount records when construction occurs. */
	componentDidMount() {
		console.log('Mounting User.')
	}

	/** componentDidUpdate records when update occurs. */
	componentDidUpdate() {
		console.log('Updating User.')
	}

	/**
		Renders the user component.
		The intent is for this to be stored in the top right of the html window
		as a profile heading, which will later allow the user to modify their profile.
		@return {JSX} Returns an HTML template for the user.
	*/
	render() {
		console.log('User render(): '+this.props.user.name)
		return (
			<>
				<h3>{User.username}</h3>
				<h3>{User.role}</h3>
			</>
		)
	}
}

export default User;
