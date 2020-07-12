import React from 'react';
import { mount, shallow, render } from 'enzyme';
import UserRow from './userRow.component.js';
describe('UserRow', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<UserRow debug />);

    expect(component).toMatchSnapshot();
  });
});
