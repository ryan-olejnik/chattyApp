import React, {Component} from 'react';
function Message(props){
    // IF USER MESSAGE:
    return(
      <div class="message">
          <span class="message-username">{props.message.username}:  </span>
          <span class="message-content">{props.message.content}</span>
          <span class="message-date"> ---date:{props.message.date}</span>
      </div>

      );

  // ELSE IF SYSTEM MESSAGE:
  //     <div class="message system">
  //   Anonymous1 changed their name to nomnom.
  // </div>
}

export default Message;