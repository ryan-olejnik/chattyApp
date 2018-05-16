import React, {Component} from 'react';

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

export default CreateMessageForm;