import React from 'react';
import Message from './Message';

export default props => {
  return props.messages.map(message => <Message message={message} key={message.id}/>)
}
