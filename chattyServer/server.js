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
  console.log('New client connected\n');
  // console.log(`There are ${numberOfClients} connected`);
  // console.log('number of users: ', wss.clients.size);
  
  ws.on('message', (message) => {
    var parsedMessage = JSON.parse(message);
    var numberOfClients = wss.clients.size;
    console.log('parsedMessage received: ', parsedMessage, '\n');

    switch(parsedMessage.type){
      case 'new_message':
        parsedMessage.message.id = uuid();
        parsedMessage.message.date = +new Date();
        wss.clients.forEach((client)=>{client.send(JSON.stringify(parsedMessage))});
        break;

      case 'username_change':
        wss.clients.forEach((client)=>{client.send(JSON.stringify(parsedMessage))});
        break;

      case 'new_client_connection':
        parsedMessage.numberOfClients = numberOfClients;
        wss.clients.forEach((client)=>{client.send(JSON.stringify(parsedMessage))});
        break;

      default:
        console.log('Unknown message recieved:', parsedMessage);
    }




    // if (parsedMessage.currentUser !== parsedMessage.message.username){
    //   let userChangeNotification = {
    //     message: {
    //       username: 'USERNAME CHANGE',
    //       content: `User ${parsedMessage.currentUser} changed their name to: ${parsedMessage.message.username}`,
    //       id: uuid(),
    //       date: +new Date(),
    //       },
    //     type: 'username_change',
    //     currentUser: parsedMessage.message.username
    //     }
    //   // console.log(parsedMessage);
    //   console.log(userChangeNotification);
    //   debugger;
    //   wss.clients.forEach((client)=>{client.send(JSON.stringify(userChangeNotification))});
    // }



    // parsedMessage.message.id = uuid();
    // parsedMessage.message.date = +new Date();
    // parsedMessage.type = 'message';

    // console.log(parsedMessage);



    // wss.clients.forEach((client)=>{client.send(JSON.stringify(parsedMessage))});

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

console.log('Socket server initialized on port 3001')

// ----------------------------------------------------------------------------------
