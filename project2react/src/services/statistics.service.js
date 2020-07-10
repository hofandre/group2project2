const axios = require('axios');

class StatService {
    constructor() {
        this.URI = 'http://localhost:5000/stats';
    }

    getAggregate() {
        return axios.get(this.URI + '/aggregate')
    }
}

export default StatService;