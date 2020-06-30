import { createStore } from 'redux';

const initialState = {
    user: null,
    displaySets: {}
};

function truthReducer(state = initialState, action) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case 'querySets':
            return Object.assign({}, state, {displaySets: action.sets})
        default:
            return state;
    }
}

let store = createStore(truthReducer);

export default store;