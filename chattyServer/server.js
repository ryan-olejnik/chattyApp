// const express = require('express');
const WebSocket = require('ws');
const uuid = require('uuid/v1');

// const PORT = 3000;
// Create a new express server
// const server = express()
//    // Make the express server serve static assets (html, javascript, css) from the /public folder
//   .use(express.static('public'))
//   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({port: 3001});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    var parsedMessage = JSON.parse(message);


    if (parsedMessage.currentUser !== parsedMessage.message.username){
      let userChangeNotification = {
        message: {
          username: 'USERNAME CHANGE',
          content: `User ${parsedMessage.currentUser} changed their name to: ${parsedMessage.message.username}`,
          id: uuid(),
          date: +new Date(),
          },
        type: 'username_change',
        currentUser: parsedMessage.message.username
        }
      // console.log(parsedMessage);
      console.log(userChangeNotification);
      debugger;
      wss.clients.forEach((client)=>{client.send(JSON.stringify(userChangeNotification))});
    }



    parsedMessage.message.id = uuid();
    parsedMessage.message.date = +new Date();
    parsedMessage.type = 'message';

    console.log(parsedMessage);



    wss.clients.forEach((client)=>{client.send(JSON.stringify(parsedMessage))});

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

console.log('Socket server initialized on port 3001')

// ----------------------------------------------------------------------------------
