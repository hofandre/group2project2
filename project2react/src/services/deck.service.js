const {default:axios} = require('axios')

/** UserService handles http requests related to the User component class.*/
class DeckService {

	/** UserService constructor establishes the URI to handle this route. */
	constructor() {
		this.URI = 'http://localhost:5000/decks';
    }
    addDeck(title, set_list) {
        return axios.post(this.URI, {'title':title, 'sets':set_list} )
    }

}

export default DeckService;
