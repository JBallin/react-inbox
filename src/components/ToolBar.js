import React from 'react';

const countSelected = messages => {
  return messages.reduce((count, msg) => msg.selected ? ++count : count, 0);
}
const countUnread = messages => {
  return messages.reduce((count, msg) => msg.read ? count : ++count, 0);
}

const amountSelected = messages => {
  const numSelected = countSelected(messages);
  const numMessages = messages.length;
  const selectedRatio = numSelected/numMessages;

  if (selectedRatio === 1) return 'all'
  if (selectedRatio > 0 && selectedRatio < 1) return 'some'
  if (selectedRatio === 0) return 'none'

  throw new Error('selectedRatio not in range[0,1]')
}

const getSelected = messages => {
  const amt = amountSelected(messages);

  if (amt === 'all') return { check: 'check-', disabled: null }
  if (amt === 'some') return { check: 'minus-', disabled: null }
  if (amt === 'none') return { check: '', disabled: 'disabled'}

  throw new Error('Wrong input to getSelected');
}


export default ({ messages }) => {

  const selected = getSelected(messages);
  const numUnread = countUnread(messages)

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

        <button className="btn btn-default">
          <i className={`fa fa-${selected.check}square-o`}></i>
        </button>

        <button className="btn btn-default" disabled={selected.disabled}>
          Mark As Read
        </button>

        <button className="btn btn-default" disabled={selected.disabled}>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={selected.disabled}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={selected.disabled}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={selected.disabled}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}
