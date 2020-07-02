import { createStore } from 'redux';

const initialState = {
    user: null,
    username: '',
    password: '',
    role: '',
    register: {username: '', password: '', role: ''}
};

function libraryReducer(state = initialState, action) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case 'login':
            return Object.assign({}, state, {username: '', user: action.user, media: null})
        case 'register':
            return Object.assign({}, state, {username: '', password: '', role: ''})
        default:
            return state;
    }
}

let store = createStore(libraryReducer);

export default store;
