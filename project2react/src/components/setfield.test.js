import React from 'react';
import { mount, shallow, render } from 'enzyme';
import SetField from './setfield.component.js';
describe('SetField', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<SetField debug />);

    expect(component).toMatchSnapshot();
  });
});
