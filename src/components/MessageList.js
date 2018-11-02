import React from 'react';
import Message from './Message';

const MessageList = ({ messages, toggleSelect, toggleStar, selectedMessages }) => (
  messages.map(message =>
    <Message
      message={message}
      isSelected={selectedMessages.includes(message.id)}
      toggleSelect={toggleSelect}
      toggleStar={toggleStar}
      key={message.id}
    />
  )
);

export default MessageList;
