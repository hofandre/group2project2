const axios = require('axios');

class SetService {
    constructor(){
        this.URI = 'http://localhost:5000/sets';
    }

    getSets() {
        return axios.get(this.URI);
    }
    /*
    addBook(book) {
        return axios.post(this.URI, book);
    }*/
}

export default SetService;