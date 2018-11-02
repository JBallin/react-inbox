import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar';
import MessageList from './components/MessageList';

const API_URL = `${process.env.REACT_APP_API_URL}/messages`;

class App extends Component {
  state = {
    messages: [],
    selectedMessages: [] ,
  }

  async componentDidMount() {
    const messages = await fetch(API_URL).then(r => r.json());
    this.setState({ messages });
  }

  toggleSelect = msgId => {
    this.setState(prevState => {
      const { selectedMessages } = prevState;
      const i = selectedMessages.indexOf(msgId);
      if (i === -1) {
        selectedMessages.push(msgId);
        selectedMessages.sort();
      } else {
        selectedMessages.splice(i, 1);
      }
      return { selectedMessages };
    });
  };

  toggleSelectAll = () => {
    this.setState(prevState => {
      const { messages, selectedMessages } = prevState;
      const numSelected = selectedMessages.length;
      if (!numSelected) return { selectedMessages: messages.map(m => m.id) };
      return { selectedMessages: [] };
    });
  };

  fetchMessages = async (method, messageIds, command, options={}) => {
    const body = JSON.stringify({ messageIds, command, ...options });
    const headers = { 'Content-Type': 'application/json' };
    const patchResponse = await fetch(API_URL, { method, body, headers });
    const messages = await patchResponse.json();
    this.setState({ messages });
  }

  toggleStar = (messageIds) => {
    this.fetchMessages('PATCH', messageIds, 'star');
  };

  toggleStarSelected = () => {
    const { messages, selectedMessages } = this.state;
    let starredSelectedMessages = messages.filter(m => selectedMessages.includes(m.id) && m.starred).map(m => m.id);
    if (!starredSelectedMessages.length) this.toggleStar(selectedMessages);
    else this.toggleStar(starredSelectedMessages);
  };

  updateRead = (isRead) => {
    this.fetchMessages('PATCH', this.state.selectedMessages, 'read', { read: isRead });
  };

  deleteSelected = async () => {
    this.fetchMessages('PATCH', this.state.selectedMessages, 'delete');
    this.setState({ selectedMessages: [] })
  };

  addLabel = label => {
    this.fetchMessages('PATCH', this.state.selectedMessages, 'addLabel', { label });
  };

  removeLabel = label => {
    this.fetchMessages('PATCH', this.state.selectedMessages, 'removeLabel', { label });
  };

  render() {
    return (
      <div className='container'>
        <ToolBar
          messages={this.state.messages}
          selectedMessages={this.state.selectedMessages}
          updateRead={this.updateRead}
          toggleSelectAll={this.toggleSelectAll}
          deleteSelected={this.deleteSelected}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          toggleStarSelected={this.toggleStarSelected}
        />
        <MessageList
          selectedMessages={this.state.selectedMessages}
          messages={this.state.messages}
          toggleSelect={this.toggleSelect}
          toggleStar={this.toggleStar}
        />
      </div>
    );
  }
}

export default App;
