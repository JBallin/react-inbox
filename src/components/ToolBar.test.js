import React from 'react';
import ReactDOM from 'react-dom';
import ToolBar from './ToolBar';

describe('ToolBar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ToolBar selected='none' />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
