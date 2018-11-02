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
  const labels = ['dev', 'gschool', 'personal'];

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

  const composeButton = (
    <a className="btn btn-danger">
      <i className="fa fa-plus"></i>
    </a>
  );

  const selectButton = (
    <button
      className="btn btn-default"
      onClick={toggleSelectAll}
      disabled={!messages.length}
    >
      <i className={`fa fa-${selectAllClass}square-o`}></i>
    </button>
  );

  const trashButton = (
    <button
      className="btn btn-default"
      disabled={isDisabled}
      onClick={deleteSelected}
    >
      <i className="fa fa-trash-o"></i>
    </button>
  );

  const starButton = (
    <button
      className="btn btn-default"
      disabled={isDisabled}
      onClick={toggleStarSelected}
    >
      <i className="fa fa-star-o"></i>
    </button>
  );

  const ReadButton = ({isRead}) => (
    <button
      className="btn btn-default"
      disabled={isDisabled}
      onClick={() => updateRead(isRead)}
    >
      Mark as {isRead ? "Read" : "Unread"}
    </button>
  );

  const LabelSelect = ({value, onChange}) => {
    const labelOptions = labels.map((label, i) => <option value={label} key={i}>{label}</option>);
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
    return (
      <select
        value={value}
        className="form-control label-select"
        disabled={isDisabled}
        onChange={e => onChange(e.target.value)}
      >
        <option value={value} disabled>{capitalize(value)} label</option>
        { labelOptions }
      </select>
  )};

  const unreadCounter = (
    <p className="pull-right">
      <span className="badge badge">{numUnread}</span>
      unread message{`${numUnread === 1 ? '': 's'}`}
    </p>
  );

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        { composeButton }
        { selectButton }
        { trashButton }
        { starButton }
        <ReadButton isRead={true} />
        <ReadButton isRead={false} />
        <LabelSelect value="apply" onChange={addLabel} />
        <LabelSelect value="remove" onChange={removeLabel} />
        { unreadCounter }
      </div>
    </div>
  )
}

export default ToolBar;
