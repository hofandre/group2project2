import React from 'react';
import { mount, shallow, render } from 'enzyme';
import JoinForm from './joinform.component.js';
describe('JoinForm', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<JoinForm debug />);

    expect(component).toMatchSnapshot();
  });
});
