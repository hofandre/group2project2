import { createStore } from 'redux';

const initialState = {
    setID: null,
    setTitle: '',
    
    /*
    user: null,
    username: '',
    media: null,
    displayMedia: [],
    addVideoGame: { title: '', developer: '', platform: '', rating: '', genre: '' },
    newMovie: {'title': '', 'director': '', 'genre': '', 'length': 0, 'rating': '', 'actors': []},
    book: {title: '', author: '', isbn:'', genre: '' }
    */
};

function libraryReducer(state = initialState, action) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        /*
        I left these here so that you guys would see how it worked before
        case 'login':
            return Object.assign({}, state, {username: '', user: action.user, media: null})
        case 'loadMedia':
            return Object.assign({}, state, {media: action.media})
        case 'handleFieldChange':
            return Object.assign({}, state, {addVideoGame: action.media})
        case 'handleUsername':
            return Object.assign({}, state, {username: action.username})
        case 'queryMedia':
            return Object.assign({}, state, {displayMedia: action.media})
        case 'addVideoGame':
            return Object.assign({}, state, {addVideoGame: action.media})
        case 'movieFieldUpdate':
            return Object.assign({}, state, {newMovie: action.newMovie})
        */


        //I'm not sure how this works

        case 'handleBookFieldChange':
            return Object.assign({}, state, {set: action.book})

        default:
            return state;
    }
}

let store = createStore(libraryReducer);

export default store;