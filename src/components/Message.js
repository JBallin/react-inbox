import React from 'react';
import Labels from './Labels'

const Message = ({ message, isSelected, toggleSelect, toggleStar }) => {
  const readClass = message.read ? 'read' : 'unread';
  const selectedClass = isSelected ? 'selected' : '';
  const starClass = `star fa fa-star${message.starred ? '' : '-o' }`;

  const starMessage = e => {
    e.stopPropagation();
    toggleStar([message.id]);
  }

  const checkBox = (
    <div className="col-xs-2">
      <input
        type="checkbox"
        checked={ isSelected }
        onChange={() => toggleSelect(message.id)}/>
    </div>
  );

  const star = (
    <div className="col-xs-2">
      <i className={starClass} onClick={starMessage}></i>
    </div>
  );

  const labelsAndSubject = (
    <div className="col-xs-11">
      <Labels labels={message.labels} />
      <a>{message.subject}</a>
    </div>
  );

  return (
    <div className={`row message ${readClass} ${selectedClass}`}>
      <div className="col-xs-1">
        <div className="row">
          { checkBox }
          { star }
        </div>
      </div>
      { labelsAndSubject }
    </div>
  )
}

export default Message;
