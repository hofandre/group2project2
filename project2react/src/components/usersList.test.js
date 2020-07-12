import React from 'react';
import { mount, shallow, render } from 'enzyme';
import UserTable from './userList.component.js';
describe('UserTable', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<UserTable debug />);

    expect(component).toMatchSnapshot();
  });
});
