const {default:axios} = require('axios')

/** UserService handles http requests related to the User component class.*/
class RegisterService {

	/** UserService constructor establishes the URI to handle this route. */
	constructor() {
		this.URI = 'http://localhost:5000/register';
	}

	/**
		Register function handles registering at the designated URI.
		@param {string} username This is a React prop username.
		@param {string} password This is a React prop password.
		@param {string} role This is a React prop role.
		@return {HTTP POST Request} A request to the server with new user credentials.
	*/
	register(username, password, role, age) {
		// console.log("register.service")
		// console.log(username)
		// console.log(password)
		// console.log(role)
		return axios.post(this.URI, {'username': username, 'password':password, 'role': role, 'age': age})
	}
}

export default RegisterService;
