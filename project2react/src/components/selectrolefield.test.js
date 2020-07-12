import React from 'react';
import { mount, shallow, render } from 'enzyme';
import SelectRoleField from './selectrolefield.component.js';
describe('SelectRoleField', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<SelectRoleField debug />);

    expect(component).toMatchSnapshot();
  });
});
