import React from 'react';
import { mount, shallow, render } from 'enzyme';
import User from './user.component.js';
describe('User', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<User debug />);

    expect(component).toMatchSnapshot();
  });
});
