import React from 'react';
import { mount, shallow, render } from 'enzyme';
import DeckForm from './deckForm.component.js';
describe('DeckForm', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<DeckForm debug />);

    expect(component).toMatchSnapshot();
  });
});
