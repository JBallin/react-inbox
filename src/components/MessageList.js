import React from 'react';
import Message from './Message';

const MessageList = ({ messages, toggleSelect, toggleStar }) => (
  messages.map(message =>
    <Message
      message={message}
      toggleSelect={toggleSelect}
      toggleStar={toggleStar}
      key={message.id}
    />
  )
);

export default MessageList;
