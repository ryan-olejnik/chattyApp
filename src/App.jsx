import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import CreateMessageForm from './CreateMessageForm.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: 'Ryan-Olej',
      messageList: []
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  changeUsername(newUsername){
    this.setState({currentUser: newUsername});
  }

  addMessage(newMessage){
    this.webSocket.send(JSON.stringify({message: newMessage, currentUser: this.state.currentUser}))
  }

  componentDidMount(){
    this.webSocket = new WebSocket("ws://localhost:3001");
    this.webSocket.onopen = (event)=>{
      this.webSocket.addEventListener('message', (message)=>{
        let parsedMessage = JSON.parse(message.data);
        // console.log(parsedMessage);
        if (parsedMessage.type === 'username_change'){
          console.log(parsedMessage.currentUser);
          this.setState({currentUser: parsedMessage.currentUser});
        }

        this.setState({messageList: [...this.state.messageList, parsedMessage.message]});

      });
    }
  }



  render() {
    return (
      <div id='page_container'>
        <Navbar/>
        <MessageList messageList={this.state.messageList}/>
        <CreateMessageForm 
          currentUser={this.state.currentUser} 
          addMessage={this.addMessage} 
          changeUsername={this.changeUsername}
        />
      </div>
    );
  }
}

export default App;
