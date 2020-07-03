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
    
    vote(username, setId, vote){
		return axios.post(this.URI + "/" + username, {'setId':setId, 'vote': vote}, {withCredentials: true})
    }
}

export default SetService;
