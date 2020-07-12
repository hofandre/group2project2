import React from 'react';
import { mount, shallow, render } from 'enzyme';
import FormField from './routing.component.js';
describe('Routing', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<Routing debug />);

    expect(component).toMatchSnapshot();
  });
});
