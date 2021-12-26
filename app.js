const express = require('express');
const api = require('./api');
const websocket = require('./websocket');

// make an express app
const app = express();
const port = 3000;

// get the API routing started
app.use('/api', api);

// use the static directory to serve static html files
app.use(express.static('static'));

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// adds WebSocket support to Express server
server.on('upgrade', (request, socket, head) => {
    websocket.wsServer.handleUpgrade(request, socket, head, socket => {
        websocket.wsServer.emit('connection', socket, request);
    });
});