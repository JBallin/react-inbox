import React from 'react';
import Labels from './Labels'

const getRead = message => message.read ? 'read' : 'unread';
const getStarred = message => message.starred ? '' : '-o';
const getSelected = message => message.selected ? 'selected' : '';

export default ({ message, toggleSelected, toggleStarred }) => {
  return (
    <div className={`row message ${getRead(message)} ${getSelected(message)}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={Boolean(message.selected)} onChange={e => toggleSelected(message, e)}/>
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${getStarred(message)}`} onClick={e => toggleStarred(message, e)}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <Labels labels={message.labels} />
        <a href="#">{message.subject}</a>
      </div>
    </div>
  )
}
