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
    error: false,
    expandedMessage: '',
  }

  async componentDidMount() {
    const delay = 700;
    const delayedPromise = new Promise(resolve => setTimeout(resolve, delay));
    try {
      const getMessages = fetch(API_URL).then(r => r.json());
      const messages = (await Promise.all([getMessages, delayedPromise]))[0];
      this.setState({ messages: messages.reverse(), loading: false })
    } catch (err) {
      this.setState({error: `Error fetching API`})
    }
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

  patchMessages = async (messageIds, command, options={}) => {
    const body = JSON.stringify({ messageIds, command, ...options });
    const headers = { 'Content-Type': 'application/json' };
    const patchResponse = await fetch(API_URL, { method: 'PATCH', body, headers });
    const messages = await patchResponse.json();
    return messages.reverse();
  };

  patchMessagesAndState = async (...args) => {
    this.setState({ messages: await this.patchMessages(...args) });
  };

  toggleStar = (messageIds) => {
    this.patchMessagesAndState(messageIds, 'star');
  };

  toggleStarSelected = () => {
    const { messages, selectedMessages } = this.state;
    let starredSelectedMessages = messages.filter(m => selectedMessages.includes(m.id) && m.starred).map(m => m.id);
    if (!starredSelectedMessages.length) this.toggleStar(selectedMessages);
    else this.toggleStar(starredSelectedMessages);
  };

  updateRead = (isRead, messages=this.state.selectedMessages) => {
    return this.patchMessages(messages, 'read', { read: isRead });
  };

  updateReadAndState = async (...args) => {
    const messages = await this.updateRead(...args);
    this.setState({ messages });
  };

  toggleExpanded = async (msgId) => {
    if (this.state.expandedMessage === msgId) {
      this.setState({ expandedMessage: "" });
    } else {
      const messages = await this.updateRead(true, [msgId])
      this.setState({ expandedMessage: msgId, messages });
    }
  };

  deleteSelected = async () => {
    const messages = await this.patchMessages(this.state.selectedMessages, 'delete');
    this.setState({ selectedMessages: [], messages })
  };

  addLabel = label => {
    this.patchMessagesAndState(this.state.selectedMessages, 'addLabel', { label });
  };

  removeLabel = label => {
    this.patchMessagesAndState(this.state.selectedMessages, 'removeLabel', { label });
  };

  toggleCompose = () => {
    this.setState(prevState => ({ isComposeOpen: !prevState.isComposeOpen }));
  }

  composeMessage = async msg => {
    const body = JSON.stringify(msg);
    const headers = { 'Content-Type': 'application/json' };
    const postResponse = await fetch(API_URL, { method: 'POST', body, headers });
    const newMessage = await postResponse.json();
    this.setState(prevState => ({
      messages: [newMessage, ...prevState.messages],
      isComposeOpen: !prevState.isComposeOpen
    }));
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

    const Inbox = (
      <div className='container'>
        <ToolBar
          messages={this.state.messages}
          selectedMessages={this.state.selectedMessages}
          updateRead={this.updateReadAndState}
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
          expandedMessage={this.state.expandedMessage}
          toggleExpanded={this.toggleExpanded}
        />
      </div>
    );

    const Error = () => (
      <div className="container">
        <h2>{ this.state.error }</h2>
      </div>
    )

    const loadPage = () => {
      const { loading, error } = this.state;
      if (error) return <Error />;
      if (loading) return <Spinner />;
      return Inbox;
    }

    return (
      <div>
        <Header />
        { loadPage() }
      </div>
    );
  }
}

export default App;
