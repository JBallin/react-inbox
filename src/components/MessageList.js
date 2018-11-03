import React from 'react';
import Message from './Message';

const MessageList = ({
  messages,
  toggleSelect,
  toggleStar,
  selectedMessages,
  toggleExpanded,
  expandedMessage,
 }) => (
  messages.map(message => (
    <Message
      message={message}
      isSelected={selectedMessages.includes(message.id)}
      toggleSelect={toggleSelect}
      toggleStar={toggleStar}
      toggleExpanded={toggleExpanded}
      key={message.id}
      isExpanded={expandedMessage === message.id}
    />
  ))
);

export default MessageList;
