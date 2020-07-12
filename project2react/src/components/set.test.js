import React from 'react';
import { mount, shallow, render } from 'enzyme';
import Set from './set.component.js';
describe('Set', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<Set debug />);

    expect(component).toMatchSnapshot();
  });
});
