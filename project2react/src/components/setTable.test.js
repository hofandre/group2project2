import React from 'react';
import { mount, shallow, render } from 'enzyme';
import SetTable from './setTable.component.js';
describe('SetTable', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<SetTable debug />);

    expect(component).toMatchSnapshot();
  });
});
