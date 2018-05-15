import React, {Component} from 'react';

function Navbar(props){
  return (
    <div id='navbar'>
      <p>Chattyyyyyyyyyy</p>
    </div>
    );
}


class MessageList extends React.Component{
  render(){
    return (
      <div>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
      </div>
      )
  }
}

class Message extends React.Component{
  render(){
    return(<p>This is a message</p>);
  }
}

class CreateMessageForm extends React.Component{
  render(){
    return (
      <div id='message_form'>
        <form>
          <input type='text' name='name' placeholder='Your Name...'></input>
          <input type='text' name='message' placeholder='Your Message...'></input>
          <button type='submit'>Post Message!</button>
        </form>
      </div>
      )
  }
}


class App extends React.Component {
  render() {
    return (
      <div id='page_container'>
        <Navbar/>
        <MessageList/>
        <CreateMessageForm/>
      </div>
    );
  }
}


export default App;
