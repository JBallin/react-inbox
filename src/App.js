import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'

class App extends Component {
  state = {
    messages: [
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ]
  }

  toggleSelected = (message, e) => {
    const updateSelectedMessages = this.state.messages.map(msg => {
      if (msg.id === message.id) msg.selected = e.target.checked;
      return msg;
    })
    this.setState({messages: updateSelectedMessages})
  }

  toggleSelectedAll = amtSelected => {
    let toggleSelected;
    if (amtSelected === 'none' || amtSelected === 'some') {
      toggleSelected = true;
    } else if (amtSelected === 'all') {
      toggleSelected = false;
    } else {
      throw new Error('Incorrect input to toggleSelectedAll')
    }

    const updateSelectedAllMessages = this.state.messages.map(msg => {
      msg.selected = toggleSelected;
      return msg;
    })

    this.setState({messages: updateSelectedAllMessages})
  }

  toggleStarred = message => {
    const updateStarredMessages = this.state.messages.map(msg => {
      if (msg.id === message.id) msg.starred = !msg.starred;
      return msg
    })
    this.setState({messages: updateStarredMessages})
  }

  toggleRead = (isRead, messages) => {
    const updateReadMessages = this.state.messages.map(msg => {
      if (msg.selected) msg.read = isRead;
      return msg;
    })
    this.setState({messages: updateReadMessages})
  }

  deleteSelected = () => {
    const rmDeleted = this.state.messages.filter(msg => !msg.selected);
    this.setState({messages: rmDeleted})
  }

  render() {
    return (
      <div className='container'>
        <ToolBar messages={this.state.messages} toggleRead={this.toggleRead} toggleSelectedAll={this.toggleSelectedAll} deleteSelected={this.deleteSelected}/>
        <MessageList messages={this.state.messages} toggleSelected={this.toggleSelected} toggleStarred={this.toggleStarred}/>
      </div>
    );
  }
}

export default App;
