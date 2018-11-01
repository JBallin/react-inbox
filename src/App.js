import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'
import seedMessages from './db/seedMessages'

class App extends Component {
  state = { messages: seedMessages }

  toggle = (msg, prop) => {
    const i = this.state.messages.indexOf(msg);
    this.setState(prevState => (
      {messages: [
        ...prevState.messages.slice(0, i),
        { ...msg, [prop]: !msg[prop] },
        ...prevState.messages.slice(i + 1)
      ]}
    ))
  }

  toggleSelected = msg => this.toggle(msg, 'selected');

  updateSelectedAll = amtSelected => {
    let isAllSelected;
    if (amtSelected === 'none') {
      isAllSelected = true;
    } else if (amtSelected === 'all' || amtSelected === 'some') {
      isAllSelected = false;
    } else {
      throw new Error('Incorrect input to updateSelectedAll')
    }

    this.setState(prevState => ({
      messages: prevState.messages.map(msg => ({
        ...msg, selected: isAllSelected
      }))
    }))

  }

  toggleStarred = msg => this.toggle(msg, 'starred')

  updateRead = isRead => {
    this.setState(prevState => ({
      messages: prevState.messages.map(msg => (
          msg.selected ? {...msg, read: isRead} : msg
        ))
    }))
  }

  deleteSelected = () => {
    this.setState(prevState => ({
      messages: prevState.messages.filter(msg => !msg.selected)
    }))
  }

  addLabel = label => {
    this.setState(prevState => {
      const messages = prevState.messages.map(msg => {
        if (msg.selected && !msg.labels.includes(label)) {
          msg.labels.push(label);
        }
        return msg;
      })
      return ({ messages })
    })
  }

  removeLabel = label => {
    this.setState(prevState => {
      const messages = prevState.messages.map(msg => {
        if (msg.selected && msg.labels.includes(label)) {
          msg.labels = msg.labels.filter(l => l !== label);
        }
        return msg;
      });
      return ({ messages });
    });
  }

  render() {
    return (
      <div className='container'>
        <ToolBar
          messages={this.state.messages}
          updateRead={this.updateRead}
          updateSelectedAll={this.updateSelectedAll}
          deleteSelected={this.deleteSelected}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
        />
        <MessageList
          messages={this.state.messages}
          toggleSelected={this.toggleSelected}
          toggleStarred={this.toggleStarred}
        />
      </div>
    );
  }
}

export default App;
