import React, {Component} from 'react';
function Message(props){
  if (props.notification.type === 'new_client_connection'){
    return (
      <div class="message">
        <span class="message-content">{props.notification.message.content}</span>
      </div>
      );  
  } else if (props.notification.type === 'new_message'){
    return (
    <div class="message">
      <span class="message-content"><b>{props.notification.username}</b>: {props.notification.message.content}</span>
    </div>);
  } else if(props.notification.type === 'username_change'){
    return (
    <div class="message">
      <span class="message-content">{props.notification.message.content}</span>
    </div>);
  } else{
    return (
    <div class="message">
      <span class="message-content">Somthing didnt work...</span>
    </div>)
  }
}

export default Message;