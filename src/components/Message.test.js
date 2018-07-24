import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

const message = {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
};

describe('Message', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Message message={message} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
