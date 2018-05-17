import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component{
  render(){
    console.log('messageList = ', this.props.messageList);
    var messageList = this.props.messageList.map((message, index)=>{
      return (<Message key={index} notification={message}/>);  
    });
    
    return (
      <main className='messages'>
        {messageList}
      </main>
      )
  }
}

export default MessageList;


