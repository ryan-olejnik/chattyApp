import React, {Component} from 'react';

class CreateMessageForm extends React.Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    var newMessage = {content: event.target.elements.message.value};
    this.props.sendNewMessage(newMessage)
    event.target.elements.message.value = '';
  }

  render(){
    return (
      <footer className='chatbar'>
        <form className='chatbar' onSubmit={this.onSubmit}>
          <input 
            className='chatbar-message'
            type='text' 
            name='message'
            autoComplete='off'>
          </input>
          <button id='post-message-button'type='submit'>SEND</button>
        </form>
      </footer>
      )
  }
}

export default CreateMessageForm;


