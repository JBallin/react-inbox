import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
  state = {
    expanded: ""
  }

  toggleExpanded = (msgId) => {
    if (this.state.expanded === msgId) {
      this.setState({expanded: ""});
    } else {
      this.setState({expanded: msgId});
      this.props.updateRead(true, [msgId]);
    }
  }

  render () {
    const { messages, toggleSelect, toggleStar, selectedMessages } = this.props;

    return messages.map(message => (
      <Message
        message={message}
        isSelected={selectedMessages.includes(message.id)}
        toggleSelect={toggleSelect}
        toggleStar={toggleStar}
        toggleExpanded={this.toggleExpanded}
        key={message.id}
        isExpanded={this.state.expanded === message.id}
      />
    ));
  }
};

export default MessageList;
