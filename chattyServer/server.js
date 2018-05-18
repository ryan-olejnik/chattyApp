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
var colorStepper = -1;
function generateColor(){
  const colors = ['red', 'blue', 'green', 'purple'];
  colorStepper++;
  return colors[colorStepper];
}

const wss = new WebSocket.Server({port: 3001});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('New client connected\n');
  // console.log(wss.clients);
  
  ws.on('message', (message) => {
    var parsedMessage = JSON.parse(message);
    // find out who it came from????????????????????????????????????
    console.log('incoming message: ', parsedMessage);

    var numberOfClients = wss.clients.size;

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
        let color = generateColor();

        parsedMessage.numberOfClients = numberOfClients;
        parsedMessage.message.color = color;
        wss.clients.forEach((client)=>{client.send(JSON.stringify(parsedMessage))});


        ws.send(JSON.stringify({
          type: 'new_client_colorset',
          username: parsedMessage.username,
          color: color,
          message: { content: `Your color is ${color}` } }))
        break;

      default:
        console.log('Unknown message recieved:', parsedMessage);
    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

console.log('Socket server initialized on port 3001')

