import React from 'react';
import Labels from './Labels'

export default ({ message, toggleSelected, toggleStarred }) => {
  const readClass = message.read ? 'read' : 'unread';
  const starClass = `star fa fa-star${message.starred ? '' : '-o' }`
  const selectedClass = message.selected ? 'selected' : '';

  return (
    <div className={`row message ${readClass} ${selectedClass}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={!!message.selected} onChange={() => toggleSelected(message)}/>
          </div>
          <div className="col-xs-2">
            <i className={starClass} onClick={() => toggleStarred(message)}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <Labels labels={message.labels} />
        <a href={`#${message.id}`}>{message.subject}</a>
      </div>
    </div>
  )
}
