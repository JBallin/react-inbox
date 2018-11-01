import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import MessageList from './MessageList';

const messages = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  }
];

describe('MessageList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageList messages={messages} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('shallow renders messages', () => {
    const wrapper = shallow(<MessageList messages={messages} />)
    expect(wrapper.find('Message')).toHaveLength(messages.length)
  });
});
