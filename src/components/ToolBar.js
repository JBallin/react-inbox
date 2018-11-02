import React from 'react';

const ToolBar = ({
  messages,
  selectedMessages,
  updateRead,
  toggleSelectAll,
  deleteSelected,
  addLabel,
  removeLabel,
  toggleStarSelected
}) => {
  const numSelected = selectedMessages.length;
  const numUnread = messages.filter(msg => !msg.read).length;
  let selectAllClass;
  let isDisabled;

  switch(numSelected) {
    case 0:
      selectAllClass = '';
      isDisabled = true;
      break;
    case messages.length:
      selectAllClass = 'check-';
      isDisabled = false;
      break;
    default:
      selectAllClass = 'minus-';
      isDisabled = false;
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{numUnread}</span>
          unread message{`${numUnread === 1 ? '': 's'}`}
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button
          className="btn btn-default"
          onClick={toggleSelectAll}
          disabled={!messages.length}
        >
          <i className={`fa fa-${selectAllClass}square-o`}></i>
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

        <select
          value="apply"
          className="form-control label-select"
          disabled={isDisabled}
          onChange={e => {addLabel(e.target.value)}}
        >
          <option value="apply" disabled>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          value="remove"
          className="form-control label-select"
          disabled={isDisabled}
          onChange={e => {removeLabel(e.target.value)}}
        >
          <option value="remove" disabled>Remove label</option>
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

export default ToolBar;
