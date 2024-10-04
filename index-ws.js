const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function (res, res) {
  res.sendFile('index.html', { root: __dirname });
});

server.on('request', app);
server.listen(3000, function () {
  console.log('Server started on port 3000');
});

/** Begin websocket */
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server });

wss.on('connection', function (ws) {
  const numClients = wss.clients.size;
  console.log(`Clients connected ${numClients}`);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send('Welcome to my server');
  }

  ws.on('close', function () {
    wss.broadcast(`Current visitors: ${numClients}`);
    console.log('A client has disconnected');
  });
});

wss.broadcast = function (data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
