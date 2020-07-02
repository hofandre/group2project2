import { createStore } from 'redux';

const initialState = {
    user: null,
    username: '',
    password: '',
    role: '',
    register: {username: '', password: '', role: ''},
    displaySets: {},
    displaySetCriteria: 0
};

function truthReducer(state = initialState, action) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case 'login':
            return Object.assign({}, state, {username: '', password:'', user: action.user, media: null})
        case 'handleFieldChange':
            return Object.assign({}, state, {addVideoGame: action.media})
        case 'handleUsername':
            return Object.assign({}, state, {username: action.username})
        case 'handlePassword':
            return Object.assign({}, state, {password: action.password})
        case 'register':
            return Object.assign({}, state, {username: '', password: '', role: ''})
        case 'querySets':
            return Object.assign({}, state, {displaySets: action.sets})
        case 'setSearch':
            return Object.assign({}, state, {displaySetCriteria: action.setSearchCriteria})
        default:
            return state;
    }
}

let store = createStore(truthReducer);

export default store;
