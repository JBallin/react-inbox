import React from 'react';
import Message from './message';

export default props => {
  return props.messages.map(message => <Message message={message} key={message.id}/>)
}
