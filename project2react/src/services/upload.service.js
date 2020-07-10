const {default:axios} = require('axios')

/** UserService handles http requests related to the User component class.*/
class UploadService {

	/** UserService constructor establishes the URI to handle this route. */
	constructor() {
		this.set_URI = 'http://localhost:5000/potential_sets';
		this.image_URI = 'http://localhost:5000/images';
	}

	/**
		Register function handles registering at the designated URI.
		@param {file} file_one This is a React prop for image file one.
		@param {file} file_two This is a React prop for image file two.
    @param {int} correct_option This is a React prop for the set's correct image.
		@param {string} title This is a React prop for the set title.
    @param {string} file_name_one This is a React prop for the name of file one.
    @param {string} file_name_two This is a React prop for the name of file two.
    @param {string} alt_text_one This is a React prop for the alt text for file one.
    @param {string} alt_text_two This is a React prop for the alt text for file two.
		@return {HTTP POST Request} A request to the server with new user credentials.
	*/
	upload_set(file_one, file_two, correct_option, title, file_name_one, file_name_two, alt_text_one, alt_text_two, keywords) {
		console.log("upload.service.upload_set");
		return axios.post(this.set_URI, {'correct_option': correct_option, 'title': title, 'file_name_one': file_name_one, 'file_name_two': file_name_two, 'alt_text_one': alt_text_one, 'alt_text_two': alt_text_two, 'keywords': keywords}).then(
			() => {
						axios.put(this.image_URI, file_one , {
					  	headers: {
					    	'Content-Type': file_name_one
					  	}
						}).then(
							() => {
								axios.put(this.image_URI, file_two , {
									headers: {
										'Content-Type': file_name_two
									}
								});
							}
						);
			});
	}
}

export default UploadService;
