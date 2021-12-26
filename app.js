// load in environment variables from .env file
require('dotenv').config();

const express = require('express');
const websocket = require('./websocket');

// make an express app
const app = express();
const port = 80;

// use the static directory to serve static html files
app.use(express.static('static'));

// start the express server
const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// adds WebSocket support to Express server
server.on('upgrade', (request, socket, head) => {
    websocket.wsServer.handleUpgrade(request, socket, head, socket => {
        websocket.wsServer.emit('connection', socket, request);
    });
});