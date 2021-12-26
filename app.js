// load in environment variables from .env file
require('dotenv').config();

const express = require('express');
const websocket = require('./websocket');
const fs = require('fs');
const https = require('https');
const http = require('http');

// use this for HTTPS
const options = {
    key: fs.readFileSync(process.env.TLS_KEY).toString(),
    cert: fs.readFileSync(process.env.TLS_CERTIFICATE).toString(),
}

// make an express app
const app = express();
app.enable('trust proxy')

const port = 443;

// force HTTPS on all calls
app.use(function(request, response, next) {
    if (!request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    } 

    next();
});

// use the static directory to serve static html files
app.use(express.static('static'));

// start listening to HTTP (so that we can redirect to HTTPS)
http.createServer(options, app).listen(80, () => {
    console.log(`HTTP listening on port 80`);
});

// start the express server
const server = https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS listening on port ${port}`);
});

// adds WebSocket support to Express server
server.on('upgrade', (request, socket, head) => {
    websocket.wsServer.handleUpgrade(request, socket, head, socket => {
        websocket.wsServer.emit('connection', socket, request);
    });
});