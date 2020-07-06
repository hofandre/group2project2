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
    
    vote(username, set_id, vote){
		return axios.post(this.URI + "/" + set_id + "/" + username, {'vote': vote}, {withCredentials: true})
    }
    
    getSetsByKeyword(keyword) {
        return axios.get(this.URI + '?keyword=' + keyword);
    }

    comment() {
        console.log('going to send an http request')
    }
}

export default SetService;
