import React, {Component} from 'react';
function Message(props){
  // console.log('inside Message conponent, props.notification.message.color = ', props.notification.message.color);
  if (props.notification.type === 'new_client_connection'){
    return (
      <div class="message">
        <span style={{color: props.notification.message.color}} className="message-content">{props.notification.message.content}</span>
      </div>
      );  
  } else if (props.notification.type === 'new_message'){
    return (
    <div class="message">
      <span style={{color: props.notification.message.color}} className="message-content"><b>{props.notification.username}</b>: {props.notification.message.content}</span>
    </div>);
  } else if(props.notification.type === 'username_change'){
    return (
    <div class="message">
      <span style={{color: props.notification.message.color}} className="message-content">{props.notification.message.content}</span>
    </div>);
  } else if (props.notification.type === 'new_client_colorset'){
    return (null)
  } else{
    return (
    <div class="message">
      <span class="message-content">Somthing didnt work...</span>
    </div>)
  }
}

export default Message;