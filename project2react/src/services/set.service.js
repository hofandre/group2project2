const axios = require('axios');

class SetService {
    constructor(){
        this.URI = 'http://localhost:5000/sets';
    }

    getSets() {
        return axios.get(this.URI);
    }

    getSetByID(set_id) {
        return axios.get(this.URI + '/' + set_id);
    }

    getSetsByKeyword(keyword) {
        return axios.get(this.URI + '?keyword=' + keyword);
    }
}

export default SetService;