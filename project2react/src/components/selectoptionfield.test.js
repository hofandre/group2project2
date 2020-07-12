import React from 'react';
import { mount, shallow, render } from 'enzyme';
import SelectOptionField from './selectoptionfield.component.js';
describe('SelectOptionField', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<SelectOptionField debug />);

    expect(component).toMatchSnapshot();
  });
});
