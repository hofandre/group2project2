import React from 'react';
import { mount, shallow, render } from 'enzyme';
import PendingSet from './pendingSet.component.js';
describe('PendingSet', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<PendingSet debug />);

    expect(component).toMatchSnapshot();
  });
});
