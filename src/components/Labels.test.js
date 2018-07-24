import React from 'react';
import ReactDOM from 'react-dom';
import Labels from './Labels';

const labels = ['dev', 'personal']

describe('Labels', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Labels labels={labels}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
