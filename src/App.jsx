import React, {Component} from 'react';


function Navbar(props){
  return (
    <nav className='navbar'>
      <a href="/" className='navbar-brand'>Chattyyyyyyyyyy</a>
    </nav>
    );
}

class MessageList extends React.Component{
  render(){
    var messageList = this.props.messageList.map((message, index)=>{
      // console.log('index = ', index);
      return (<Message key={index} message={message}/>);
    });
    
    // console.log(messageList);
    return (
      <main className='messages'>
        {messageList}
      </main>
      )
  }
}

class Message extends React.Component{

  render(){
    // console.log(this.props)

    // IF USER MESSAGE:
    return(
      <div class="message">
          <span class="message-username">{this.props.message.username}:  </span>
          <span class="message-content">{this.props.message.content}</span>
      </div>

      );

  // ELSE IF SYSTEM MESSAGE:
  //     <div class="message system">
  //   Anonymous1 changed their name to nomnom.
  // </div>
  }
}

class CreateMessageForm extends React.Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    var newMessage = {username: event.target.elements.username.value, content: event.target.elements.message.value};
    this.props.addMessage(newMessage)
    event.target.elements.message.value = '';
  }

  render(){
    return (
      <footer className='chatbar'>
        <form className='chatbar' onSubmit={this.onSubmit}>
          <input
            className='chatbar-username' 
            type='text' defaultValue={this.props.currentUser} 
            name='username' 
            placeholder='Your Name...'>
          </input>
          <input className='chatbar-message' type='text' name='message' ></input>
          <button type='submit'  >Post Message!</button>
        </form>
      </footer>
      )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: 'Ryan-Olej',
      messageList: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(newMessage){
    // If user has changed, create a message stating the change:
    if (newMessage.username !== this.state.currentUser){
      console.log(`User has changed from ${this.state.currentUser} to ${newMessage.username}`)
      var currentMessages = this.state.messageList;
      var userChangeMessage = {username: 'USERNAME CHANGE', content: `User ${this.state.currentUser} changed to ${newMessage.username}`}
      
      this.setState({messageList: [...currentMessages, userChangeMessage, newMessage], currentUser: newMessage.username}, ()=>{console.log('this.state = ', this.state)});
    } else {
      var currentMessages = this.state.messageList;
      this.setState({messageList: [...currentMessages, newMessage]});    

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
