import store from '../store';

const {default:axios} = require('axios')

/** UserService handles http requests related to the User component class.*/
class UserService {

	/** UserService constructor establishes the URI to handle this route. */
	constructor() {
		this.URI = 'http://localhost:5000/users';
	}

	/** 
		checkLogin function sends an axios request to the URI requiring credentials 
		and will use whatever is stored in the cookies.
		@return {HTTP GET Request} A request to the server to check if the jwt token has expired.
	*/
	checkLogin() {
		return axios.get(this.URI, {withCredentials: true})
	}

	/**
		login function handles login at the designated URI.
		@param {User} This is a React component user.
		@return {HTTP POST Request} A request to the server with the user requiring credentials.
	*/
	login(username, password) {
		console.log("user.service")
		return axios.post(this.URI + "/" + username, {'password':password}, {withCredentials: true})
	}

	/**
		logout function handles login at the designated URI.
		@return {HTTP DELETE Request} A request to the server to delete the user requiring credentials.
	*/
	logout() {
		return axios.delete(this.URI , {withCredentials: true})
	}
}

export default UserService;