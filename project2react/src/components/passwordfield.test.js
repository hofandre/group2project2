import React from 'react';
import { mount, shallow, render } from 'enzyme';
import PasswordField from './passwordfield.component.js';
describe('PasswordField', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<PasswordField debug />);

    expect(component).toMatchSnapshot();
  });
});
