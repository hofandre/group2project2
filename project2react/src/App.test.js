import React from 'react';
import { mount, shallow, render } from 'enzyme';
import configureStore from 'redux-mock-store';
import App from './App';

test('renders learn react link', () => {
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
      lastSearchMade: {type: '', param: ''},
      deckSets: []
  };
  const mockStore = configureStore();
  let store,container

  beforeEach(()=>{
      store = mockStore(initialState);
      container = shallow(<App store={store} /> )
      it('+++ render the connected(SMART) component', () => {
         expect(container.length).toEqual(1);
      });
  });
});
