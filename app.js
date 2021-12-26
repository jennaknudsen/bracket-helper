// load in environment variables from .env file
require('dotenv').config();

const express = require('express');
const websocket = require('./websocket');
const fs = require('fs');
const https = require('https');

// use this for HTTPS
const options = {
    key: fs.readFileSync(process.env.TLS_KEY).toString(),
    cert: fs.readFileSync(process.env.TLS_CERTIFICATE).toString(),
}

// make an express app
const app = express();
const port = 443;

// use the static directory to serve static html files
app.use(express.static('static'));

// start the express server
const server = https.createServer(options, app).listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// adds WebSocket support to Express server
server.on('upgrade', (request, socket, head) => {
    websocket.wsServer.handleUpgrade(request, socket, head, socket => {
        websocket.wsServer.emit('connection', socket, request);
    });
});