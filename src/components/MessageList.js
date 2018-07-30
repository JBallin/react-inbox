import React from 'react';
import Message from './Message';

export default ({ messages, toggleSelected }) => {
  return messages.map(message => <Message message={message} toggleSelected={toggleSelected} key={message.id}/>)
}
