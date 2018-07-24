import React from 'react';

export default props => {
  return props.labels.map((label, i) => <span className="label label-warning" key={i}>{label}</span>)
}
