import React, {Component} from 'react';
function Message(props){
  if (props.messageData.type === 'new_client_connection'){
    return (
      <div class="message">
        <span style={{color: props.messageData.message.color}} className="message-content">{props.messageData.message.content}</span>
      </div>
      );  
  } 
  else if (props.messageData.type === 'new_message'){
    return (
    <div class="message">
      <span style={{color: props.messageData.message.color}} className="message-content"><b>{props.messageData.username}</b>: {props.messageData.message.content}</span>
    </div>);
  } 
  else if(props.messageData.type === 'username_change'){
    return (
    <div class="message">
      <span style={{color: props.messageData.message.color}} className="message-content">{props.messageData.message.content}</span>
    </div>);
  } 
  else if (props.messageData.type === 'new_client_colorset'){
    return (null)
  } 
  else{
    return (
    <div class="message">
      <span class="message-content">Somthing didnt work...</span>
    </div>)
  }
}

export default Message;