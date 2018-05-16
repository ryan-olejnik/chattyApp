// const express = require('express');
const WebSocket = require('ws');

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
    console.log(JSON.parse(message));
    wss.clients.forEach((client)=>{client.send('Got your message!!')});

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

console.log('Socket server initialized on port 3001')

// ----------------------------------------------------------------------------------
// const WebSocket = require("ws");

// const port = 3001;

// const wss = new WebSocket.Server({ port });

// let messageList = [];

// wss.on("connection", function connection(ws) {
//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);

//     let parsedMessage = JSON.parse(message);
//     parsedMessage.date = +new Date();

//     wss.clients.forEach(function each(client) {
//       client.send(JSON.stringify(parsedMessage));
//     });
//   });

//   let initialMessage = {
//     username: "the machine",
//     value: "sparta!!!!!!!!!!!!!",
//     date: +new Date(),
//   };

//   ws.send(JSON.stringify(initialMessage));

//   console.log(`
//     new connection!!
//     the number of connections now is ${wss.clients}
//   `);
// });

// console.log(`✨ web socket server running on port ${port}`);

