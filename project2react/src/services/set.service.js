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

    approvePendingSet(set_id) {
        console.log('send a request to approve')
        return axios.post(this.URI, {'set_id': set_id}, {withCredentials: true})
    }
    deletePendingSet(set_id) {
        console.log('send a request to delete')
        return axios.delete(this.URI + '/pending/' + set_id, {withCredentials: true});
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
    deleteComment(set_id, comment_id){
        console.log('Axios delete: ' + set_id + ',' +comment_id)
        return axios.delete(this.URI + '/' + set_id+ "/" + comment_id, {withCredentials: true})
    }
}

export default SetService;
