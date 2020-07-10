import { createStore } from 'redux';

const initialState = {
    user: null,
    file_one: null,
    file_two: null,
    keywords: [],
    file: '',
    title: '',
    file_name_one: '',
    file_name_two: '',
    alt_text_one: '',
    alt_text_two: '',
    username: '',
    registerUser: '',
    password: '',
    registerPassword: '',
    minStrength: 3,
    minLength: 7,
    confirm: '',
    role: '',
    error: '',
    register: {username: '', password: '', role: ''},
    displaySets: {},
    correct_option: 0,
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
        case 'updateUsername':
            return Object.assign({}, state, {registerUser: action.username})
        case 'updatePassword':
            return Object.assign({}, state, {registerPassword: action.password})
        case 'updateConfirm':
            return Object.assign({}, state, {confirm: action.confirm})
        case 'updateRole':
            return Object.assign({}, state, {role: action.role})
        case 'updateFile':
            return Object.assign({}, state, {file: action.file})
        case 'updateTitle':
            return Object.assign({}, state, {title: action.title})
        case 'updateCorrectOption':
            return Object.assign({}, state, {correct_option: action.correct_option})
        case 'updateFileOne':
            return Object.assign({}, state, {file_one: action.file_one})
        case 'updateFileTwo':
            return Object.assign({}, state, {file_two: action.file_two})
        case 'updateFileNameOne':
            return Object.assign({}, state, {file_name_one: action.file_name_one})
        case 'updateFileNameTwo':
            return Object.assign({}, state, {file_name_two: action.file_name_two})
        case 'updateAltTextOne':
            return Object.assign({}, state, {alt_text_one: action.alt_text_one})
        case 'updateAltTextTwo':
            return Object.assign({}, state, {alt_text_two: action.alt_text_two})
        case 'updateKeywords':
            return Object.assign({}, state, {keywords: action.keywords})
        case 'updateError':
            return Object.assign({}, state, {error: action.error})
        case 'register':
            return Object.assign({}, state, {username: '', password: '', role: ''})
        case 'upload_set':
            return Object.assign({}, state, {file_one: null, file_two: null, correct_option: 0, title: '', file_name_one: '', file_name_two: '', alt_text_one: '', alt_text_two: '', keywords: []})
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
