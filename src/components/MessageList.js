import React from 'react';
import Message from './Message';

const MessageList = ({ messages, toggleSelected, toggleStarred }) => {
  return messages.map(message =>
    <Message message={message} toggleSelected={toggleSelected} toggleStarred={toggleStarred} key={message.id}/>
  )
}

export default MessageList;
