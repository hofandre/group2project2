import React from 'react';
import { mount, shallow, render } from 'enzyme';
import Login from './login.component.js';
describe('FormField', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<Login debug />);

    expect(component).toMatchSnapshot();
  });
});
