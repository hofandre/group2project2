import React from 'react';
import { mount, shallow, render } from 'enzyme';
import Upload from './upload.component.js';
describe('Upload', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<Upload debug />);

    expect(component).toMatchSnapshot();
  });
});
