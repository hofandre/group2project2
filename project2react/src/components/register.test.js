import React from 'react';
import { mount, shallow, render } from 'enzyme';
import Register from './register.component.js';
describe('Register', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<Register debug />);

    expect(component).toMatchSnapshot();
  });
});
