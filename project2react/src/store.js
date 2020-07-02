import { createStore } from 'redux';

const initialState = {
    user: null,
    username: '',
<<<<<<< HEAD
    password:'',
    media: null,
    displayMedia: [],
    addVideoGame: { title: '', developer: '', platform: '', rating: '', genre: '' },
    newMovie: {'title': '', 'director': '', 'genre': '', 'length': 0, 'rating': '', 'actors': []},
    book: {title: '', author: '', isbn:'', genre: '' }
=======
    password: '',
    role: '',
    register: {username: '', password: '', role: ''},
    displaySets: {},
    displaySetCriteria: 0
>>>>>>> 26c263bb7e8415b82ee8ce593490ac1c1b9f563f
};

function truthReducer(state = initialState, action) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case 'login':
<<<<<<< HEAD
            return Object.assign({}, state, {username: '', password:'', user: action.user, media: null})
        case 'loadMedia':
            return Object.assign({}, state, {media: action.media})
        case 'handleFieldChange':
            return Object.assign({}, state, {addVideoGame: action.media})
        case 'handleUsername':
            return Object.assign({}, state, {username: action.username})
        case 'handlePassword':
            return Object.assign({}, state, {password: action.password})
        case 'queryMedia':
            return Object.assign({}, state, {displayMedia: action.media})
        case 'addVideoGame':
            return Object.assign({}, state, {addVideoGame: action.media})
        case 'movieFieldUpdate':
            return Object.assign({}, state, {newMovie: action.newMovie})
        case 'handleBookFieldChange':
            return Object.assign({}, state, {book: action.book})
=======
            return Object.assign({}, state, {username: '', user: action.user, media: null})
        case 'register':
            return Object.assign({}, state, {username: '', password: '', role: ''})
        case 'querySets':
            return Object.assign({}, state, {displaySets: action.sets})
        case 'setSearch':
            return Object.assign({}, state, {displaySetCriteria: action.setSearchCriteria})
>>>>>>> 26c263bb7e8415b82ee8ce593490ac1c1b9f563f
        default:
            return state;
    }
}

let store = createStore(truthReducer);

export default store;
