import React from 'react';

const getSelected = messages => {
  const numSelected = messages.filter(msg => msg.selected).length;

  if (numSelected === 0) {
    return {amt: 'none', checkClass: '', isDisabled: true};
  }
  if (numSelected === messages.length) {
    return {amt: 'all', checkClass: 'check-', isDisabled: null};
  }
  if (numSelected < messages.length && numSelected > 0) {
    return {amt: 'some', checkClass: 'minus-', isDisabled: null};
  }
  throw new Error(`getSelected: numSelected (${numSelected}) < 0`)
}


export default ({messages, updateRead, updateSelectedAll, deleteSelected}) => {
  const { amt, checkClass, isDisabled } = getSelected(messages);
  const numUnread = messages.filter(msg => !msg.read).length

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{numUnread}</span>
          unread message{`${numUnread !== 1 ? 's': ''}`}
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button
          className="btn btn-default"
          onClick={() => updateSelectedAll(amt)}
          disabled={!messages.length}
        >
          <i className={`fa fa-${checkClass}square-o`}></i>
        </button>

        <button
          className="btn btn-default"
          disabled={isDisabled}
          onClick={() => updateRead(true)}
        >
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled={isDisabled}
          onClick={() => updateRead(false)}
        >
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={isDisabled}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={isDisabled}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button
          className="btn btn-default"
          disabled={isDisabled}
          onClick={deleteSelected}
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}
