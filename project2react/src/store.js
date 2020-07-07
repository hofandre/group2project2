import { createStore } from 'redux';

const initialState = {
    user: null,
    username: '',
    registerUser: '',
    password: '',
    registerPassword: '',
    minStrength: 3,
    minLength: 7,
    confirm: '',
    role: '',
    register: {username: '', password: '', role: ''},
    comment: '',
    displaySets: {},
    accuracy: 0.0,
    displaySetCriteria: 0,
    displaySearchTerm: 'id'
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
        default:
            return state;
    }
}

let store = createStore(truthReducer);

export default store;
