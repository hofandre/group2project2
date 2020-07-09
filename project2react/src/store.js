import { createStore } from 'redux';

const initialState = {
    user: {username:'', password:'', usertype:''},
    username: '',
    registerUser: '',
    password: '',
    registerPassword: '',
    minStrength: 3,
    minLength: 7,
    confirm: '',
    role: '',
    aggregateStats: {},
    register: {username: '', password: '', usertype: ''},
    displaySets: {},
    displayUsers: {},
    accuracy: 0.0,
    displaySetCriteria: 0,
    displaySearchTerm: 'id',
    displaySetAccuracy: {},
    lastSearchMade: {type: '', param: ''}
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
        case 'updateUsername':
            return Object.assign({}, state, {registerUser: action.username})
        case 'updatePassword':
            return Object.assign({}, state, {registerPassword: action.password})
        case 'updateConfirm':
            return Object.assign({}, state, {confirm: action.confirm})
        case 'updateRole':
            return Object.assign({}, state, {role: action.role})
        case 'register':
            return Object.assign({}, state, {username: '', password: '', role: ''})
        case 'querySets':
            return Object.assign({}, state, {displaySets: action.sets})
        case 'updateAccuracy':
            return Object.assign({}, state, {accuracy: action.accuracy})
        case 'setSearch':
            return Object.assign({}, state, {displaySetCriteria: action.setSearchCriteria})
        case 'searchTerm':
            return Object.assign({}, state, {displaySearchTerm: action.setSearchTerm})
        case 'updateSearch':
            return Object.assign({}, state, {lastSearchMade: action.searchMade})
        case 'queryUsers':
            return Object.assign({}, state, {displayUsers: action.users})
        case 'queryAggregate':
            return Object.assign({}, state, {aggregateStats: action.stats})
        default:
            return state;
    }
}

let store = createStore(truthReducer);

export default store;
