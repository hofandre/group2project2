import { createStore } from 'redux';

const initialState = {
    file_one: null,
    file_two: null,
    keywords: [],
    file: '',
    title: '',
    file_name_one: '',
    file_name_two: '',
    alt_text_one: '',
    alt_text_two: '',
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
    correct_option: 0,
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
        case 'updateAge':
            return Object.assign({}, state, {registerAge: action.age})
        case 'register':
            return Object.assign({}, state, {username: '', password: '', role: ''})
        case 'upload_set':
            return Object.assign({}, state, {file_one: null, file_two: null, correct_option: 0, title: '', file_name_one: '', file_name_two: '', alt_text_one: '', alt_text_two: '', keywords: []})
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
        default:
            return state;
    }
}

let store = createStore(truthReducer);

export default store;
