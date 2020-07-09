const axios = require('axios');

class SetService {
    constructor(){
        this.URI = 'http://localhost:5000/sets';
    }

    getSets() {
        return axios.get(this.URI);
    }
    getPendingSets() {
        return axios.get(this.URI + '/pending');
    }

    getSetByID(set_id) {
        return axios.get(this.URI + '/' + set_id);
    }
    
    vote(username, set_id, vote){
		return axios.post(this.URI + "/" + set_id + "/" + username + '/vote', {'vote': vote}, {withCredentials: true})
    }
    
    getSetsByKeyword(keyword) {
        return axios.get(this.URI + '?keyword=' + keyword);
    }

    comment(username, set_id, comment) {
        console.log('going to send an http request')
        return axios.post(this.URI + "/" + set_id + "/" + username + '/comment', {'comment': comment}, {withCredentials: true})
    }
    getComments(set_id) {
        return axios.get(this.URI + '/' + set_id + '/comments');
    }
    
    deleteSetByID(setID) {
        return axios.delete(this.URI + '/' + setID, {withCredentials: true})
    }
}

export default SetService;
