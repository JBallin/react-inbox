import React from 'react';
import Labels from './Labels'

export default props => {
  return (
    <div className={`row message ${props.message.read ? 'read' : 'unread'}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${props.message.starred ? '' : '-o'}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <Labels labels={props.message.labels} />
        <a href="#">{props.message.subject}</a>
      </div>
    </div>
  )
}
