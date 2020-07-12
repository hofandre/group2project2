import React from 'react';
import { mount, shallow, render } from 'enzyme';
import FileField from './filefield.component.js';
describe('FileField', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<FileField debug />);

    expect(component).toMatchSnapshot();
  });
});
