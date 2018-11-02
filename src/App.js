import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar';
import MessageList from './components/MessageList';

const API_URL = `${process.env.REACT_APP_API_URL}/messages`;

class App extends Component {
  state = { messages: [] }

  async componentDidMount() {
    const messages = await fetch(API_URL).then(r => r.json());
    this.setState({ messages });
  }

  toggleProperty = (msg, prop) => {
    this.setState(prevState => {
      const { messages } = prevState;
      const messageToToggle = messages.find(m => m.id === msg.id);
      messageToToggle[prop] = !messageToToggle[prop];
      return { messages };
    });
  };

  toggleStar = async (msg) => {
    const body = JSON.stringify({ messageIds: [msg.id], command: 'star' });
    const headers = { 'Content-Type': 'application/json' };
    const patchResponse = await fetch(API_URL, { method: 'PATCH', body, headers });
    const messages = await patchResponse.json();
    this.setState({ messages });
  };

  toggleSelect = msg => {
    this.toggleProperty(msg, 'selected');
  };

  toggleSelectAll = () => {
    const numSelected = this.state.messages.filter(m => m.selected).length;
    const selected = !numSelected;
    this.setState(prevState => ({
      messages: prevState.messages.map(msg => ({ ...msg, selected }))
    }));
  };

  updateRead = isRead => {
    this.setState(prevState => ({
      messages: prevState.messages.map(msg => msg.selected ? {...msg, read: isRead} : msg)
    }));
  };

  deleteSelected = () => {
    this.setState(prevState => ({
      messages: prevState.messages.filter(msg => !msg.selected)
    }));
  };

  addLabel = label => {
    this.setState(prevState => ({
      messages: prevState.messages.map(msg => {
        if (msg.selected && !msg.labels.includes(label)) {
          msg.labels.push(label);
          msg.labels.sort();
        }
        return msg;
      })
    }));
  };

  removeLabel = label => {
    this.setState(prevState => ({
      messages: prevState.messages.map(msg => {
        if (msg.selected && msg.labels.includes(label)) {
          msg.labels = msg.labels.filter(l => l !== label);
        }
        return msg;
      })
    }));
  };

  render() {
    return (
      <div className='container'>
        <ToolBar
          messages={this.state.messages}
          updateRead={this.updateRead}
          toggleSelectAll={this.toggleSelectAll}
          deleteSelected={this.deleteSelected}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
        />
        <MessageList
          messages={this.state.messages}
          toggleSelect={this.toggleSelect}
          toggleStar={this.toggleStar}
        />
      </div>
    );
  }
}

export default App;
