import React, {Component} from 'react';
import Message from './Message.jsx';

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

export default MessageList;