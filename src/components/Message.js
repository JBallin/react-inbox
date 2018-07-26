import React from 'react';
import Labels from './Labels'

const getRead = message => message.read ? 'read' : 'unread';
const getStarred = message => message.starred ? '' : '-o';

export default ({ message }) => {
  return (
    <div className={`row message ${getRead(message)}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${getStarred(message)}`}></i>
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
