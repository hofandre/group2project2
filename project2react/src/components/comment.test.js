import React from 'react';
import { mount, shallow, render } from 'enzyme';
import Comment from './comment.component.js';

describe('Comment', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<Comment debug />);

    expect(component).toMatchSnapshot();
  });
});
