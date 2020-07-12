import React from 'react';
import { mount, shallow, render } from 'enzyme';
import StatTable from './statistics.component.js';
describe('StatTable', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<StatTable debug />);

    expect(component).toMatchSnapshot();
  });
});
