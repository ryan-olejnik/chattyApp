const WebSocket = require('ws');
const uuid = require('uuid/v1');

var colorStepper = -1;
function generateColor(){
  const colors = ['red', 'blue', 'green', 'purple'];
  colorStepper++;
  if (colorStepper === 4){ colorStepper = 0;}
  return colors[colorStepper];
}

const wss = new WebSocket.Server({port: 3001});
wss.on('connection', (ws) => {
  console.log('New client connected\n');  
  ws.on('message', (message) => {
    var parsedMessage = JSON.parse(message);
    parsedMessage.message.id = uuid();
    parsedMessage.message.date = +new Date();

    console.log('incoming message: ', parsedMessage);
    var numberOfClients = wss.clients.size;

    switch(parsedMessage.type){
      case 'new_message':
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
          message: { content: `Your color is ${color}`, id: uuid(), date: +new Date() } }))
        break;

      default:
        console.log('Unknown message recieved:', parsedMessage);
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected');
    var numberOfClients = wss.clients.size;
    wss.clients.forEach((client)=>{
      client.send(JSON.stringify({
        type: 'client_disconnected',
        numberOfClients: numberOfClients,
        message: {
          content: 'someone left',
          id: uuid(),
          date: new Date()
        }
      }))
    });


  });
});

console.log('Socket server initialized on port 3001')

