import React from 'react';
import Message from './Message';

export default ({ messages, toggleSelected, toggleStarred }) => {
  return messages.map(message =>
    <Message message={message} toggleSelected={toggleSelected} toggleStarred={toggleStarred} key={message.id}/>
  )
}
