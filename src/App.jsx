import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import CreateMessageForm from './CreateMessageForm.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: 'Ryan-Olej',
      messageList: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          date: +new Date()
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          date: +new Date()
        }
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(newMessage){
    // If user has changed, create a message stating the change:
    if (newMessage.username !== this.state.currentUser){
      // console.log(`User has changed from ${this.state.currentUser} to ${newMessage.username}`)
      var currentMessages = this.state.messageList;
      var userChangeMessage = {username: 'USERNAME CHANGE', content: `User ${this.state.currentUser} changed to ${newMessage.username}`}
      this.setState({messageList: [...currentMessages, userChangeMessage, newMessage], currentUser: newMessage.username}, ()=>{this.webSocket.send(JSON.stringify(this.state))});
    } else {
      var currentMessages = this.state.messageList;
      this.setState({messageList: [...currentMessages, newMessage]}, ()=>{this.webSocket.send(JSON.stringify(this.state));});    
    }
  }

  componentDidMount(){
    this.webSocket = new WebSocket("ws://localhost:3001");
    this.webSocket.onopen = (event)=>{
      this.webSocket.send(JSON.stringify('componentDidMount'));
      this.webSocket.addEventListener('message', (message)=>{console.log(message.data)});
    }
  }



  render() {
    return (
      <div id='page_container'>
        <Navbar/>
        <MessageList messageList={this.state.messageList}/>
        <CreateMessageForm currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
