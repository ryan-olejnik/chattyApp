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
          type: 'message',
          content: "Has anyone seen my marbles?",
          date: +new Date()
        },
        {
          username: "Anonymous",
          type: 'message',
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          date: +new Date()
        }
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(newMessage){
    // If user has changed their username:
    // if (newMessage.username !== this.state.currentUser){
    //   // console.log(`User has changed from ${this.state.currentUser} to ${newMessage.username}`)
    //   var userChangeMessage = {username: 'USERNAME CHANGE', content: `User ${this.state.currentUser} changed to ${newMessage.username}`}
    //   this.webSocket.send(JSON.stringify({
    //       content: `User has changed from ${this.state.currentUser} to ${newMessage.username}`,
    //       username: 'username change',
    //       type: 'notification'}));

    //   this.setState({currentUser: newMessage.username});
    // } 

    // Send the newMessage to the server
    this.webSocket.send(JSON.stringify({message: newMessage, currentUser: this.state.currentUser}))


  }

  componentDidMount(){
    this.webSocket = new WebSocket("ws://localhost:3001");
    this.webSocket.onopen = (event)=>{
      // this.webSocket.send(JSON.stringify('componentDidMount'));
      this.webSocket.addEventListener('message', (message)=>{
        console.log(JSON.parse(message.data).message);
        // var currentMessageList = this.state.messageList;
        // currentMessageList.push(message.data)

        this.setState({messageList: [...this.state.messageList, JSON.parse(message.data).message]});

      });
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
