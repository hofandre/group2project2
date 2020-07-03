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
    
    voteAorB(username, setId, abString){
        let uri = `${this.URI} + '/' + ${username}`;
        return axios.post(uri, { setId: setId, vote: abString}, {withCredentials:true});
    }
}

export default SetService;
