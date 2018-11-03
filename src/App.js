import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar';
import MessageList from './components/MessageList';
import ComposeForm from './components/ComposeForm';
import Spinner from './components/Spinner';

const API_URL = `${process.env.REACT_APP_API_URL}/messages`;

class App extends Component {
  state = {
    messages: [],
    selectedMessages: [],
    isComposeOpen: false,
    loading: true,
  }

  async componentDidMount() {
    const messages = await fetch(API_URL).then(r => r.json());
    setTimeout(() => {
      this.setState({ messages, loading: false })
    }, 700);
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

  updateMessages = async (messageIds, command, options={}) => {
    const body = JSON.stringify({ messageIds, command, ...options });
    const headers = { 'Content-Type': 'application/json' };
    const patchResponse = await fetch(API_URL, { method: 'PATCH', body, headers });
    const messages = await patchResponse.json();
    this.setState({ messages });
  }

  toggleStar = (messageIds) => {
    this.updateMessages(messageIds, 'star');
  };

  toggleStarSelected = () => {
    const { messages, selectedMessages } = this.state;
    let starredSelectedMessages = messages.filter(m => selectedMessages.includes(m.id) && m.starred).map(m => m.id);
    if (!starredSelectedMessages.length) this.toggleStar(selectedMessages);
    else this.toggleStar(starredSelectedMessages);
  };

  updateRead = (isRead, messages=this.state.selectedMessages) => {
    this.updateMessages(messages, 'read', { read: isRead });
  };

  deleteSelected = async () => {
    this.updateMessages(this.state.selectedMessages, 'delete');
    this.setState({ selectedMessages: [] })
  };

  addLabel = label => {
    this.updateMessages(this.state.selectedMessages, 'addLabel', { label });
  };

  removeLabel = label => {
    this.updateMessages(this.state.selectedMessages, 'removeLabel', { label });
  };

  toggleCompose = () => {
    this.setState(prevState => ({ isComposeOpen: !prevState.isComposeOpen }));
  }

  composeMessage = async msg => {
    this.toggleCompose();
    const body = JSON.stringify(msg);
    const headers = { 'Content-Type': 'application/json' };
    const postResponse = await fetch(API_URL, { method: 'POST', body, headers });
    const newMessage = await postResponse.json();
    this.setState(prevState => ({ messages: [...prevState.messages, newMessage ] }));
  }

  render() {
    const composeForm = (
      <ComposeForm
        composeMessage={this.composeMessage}
      />
    );

    const Header = () => (
      <div className="navbar navbar-default">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">React Inbox</a>
        </div>
      </div>
    );

    const Inbox = () => (
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
          toggleCompose={this.toggleCompose}
        />
        { this.state.isComposeOpen ? composeForm : "" }
        <MessageList
          selectedMessages={this.state.selectedMessages}
          messages={this.state.messages}
          toggleSelect={this.toggleSelect}
          toggleStar={this.toggleStar}
          updateRead={this.updateRead}
        />
      </div>
    );

    return (
      <div>
        <Header />
        { this.state.loading ? <Spinner /> : <Inbox /> }
      </div>
    );
  }
}

export default App;
