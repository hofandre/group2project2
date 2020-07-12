import React from 'react';
import { mount, shallow, render } from 'enzyme';
import FormField from './formfield.component.js';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<FormField debug />);

    expect(component).toMatchSnapshot();
  });
});
