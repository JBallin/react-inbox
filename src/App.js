import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/toolbar'
import MessageList from './components/messagelist'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolBar selected='none' />
        <MessageList />
      </div>
    );
  }
}

export default App;
