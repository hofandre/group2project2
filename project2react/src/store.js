import { createStore } from 'redux';

const initialState = {
    user: {username:'', password:'', usertype:''},
    username: '',
    registerUser: '',
    password: '',
    registerPassword: '',
    registerAge: 0,
    minStrength: 3,
    minLength: 7,
    confirm: '',
    role: '',
    aggregateStats: {},
    comment: '',
    register: {username: '', password: '', usertype: ''},
    displaySets: {},
    displayPendingSets: {},
    displayComments: {},
    displayUsers: {},
    accuracy: 0.0,
    displaySetCriteria: 0,
    displaySearchTerm: 'id',
    displaySetAccuracy: {},
    lastSearchMade: {type: '', param: ''},
    deckSets: []
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
        case 'handleComment':
            return Object.assign({}, state, {comment: action.comment})
        case 'updateUsername':
            return Object.assign({}, state, {registerUser: action.username})
        case 'updatePassword':
            return Object.assign({}, state, {registerPassword: action.password})
        case 'updateConfirm':
            return Object.assign({}, state, {confirm: action.confirm})
        case 'updateRole':
            return Object.assign({}, state, {role: action.role})
        case 'updateAge':
            return Object.assign({}, state, {registerAge: action.age})
        case 'register':
            return Object.assign({}, state, {username: '', password: '', role: ''})
        case 'querySets':
            return Object.assign({}, state, {displaySets: action.sets})
        case 'unquerySets':
            return Object.assign({}, state, {displaySets: {}})
        case 'queryPendingSets':
            return Object.assign({}, state, {displayPendingSets: action.pendingSets})
        case 'unqueryPendingSets':
            return Object.assign({}, state, {displayPendingSets: {}})
        case 'queryComments':
            return Object.assign({}, state, {displayComments: action.comments})
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
        case 'setComments':
            return Object.assign({}, state, {comment: action.comment})
        case 'addSetToDeck':
            return Object.assign({}, state, {deckSets: action.sets})
        default:
            return state;
    }
}

let store = createStore(truthReducer);

export default store;
