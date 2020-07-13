import React from 'react';
import { mount, shallow, render } from 'enzyme';
import configureStore from 'redux-mock-store';
import FormField from './formfield.component.js';
describe('FormField', () => {
  const initialState = {
      accuracy: 0.0,
      aggregateStats: {},
      alt_text_one: '',
      alt_text_two: '',
      comment: '',
      confirm: '',
      correct_option: 0,
      deckSets: [],
      displayComments: {},
      displayPendingSets: {},
      displaySets: {},
      displaySearchTerm: 'id',
      displaySetCriteria: 0,
      displaySetAccuracy: {},
      displayUsers: {},
      file: '',
      file_one: null,
      file_two: null,
      file_name_one: '',
      file_name_two: '',
      keywords: [],
      lastSearchMade: {type: '', param: ''},
      minStrength: 3,
      minLength: 7,
      password: '',
      pendingSet: {title: ''},
      register: {username: '', password: '', usertype: ''},
      registerAge: 0,
      registerPassword: '',
      registerUser: '',
      role: '',
      set: {title: ''},
      title: '',
      user: {username:'', password:'', usertype:''},
      username: ''
  };
  const mockStore = configureStore();
  let store,container

  beforeEach(()=>{
      store = mockStore(initialState);
      container = shallow(<FormField store={store} /> )
  })

  it('+++ render the connected(SMART) component', () => {
     expect(container.length).toEqual(1);
  });

  it('+++ check Prop matches with initialState', () => {
     expect(container.prop('output')).toEqual(initialState.output);
  });
});
