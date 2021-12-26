const app = require('./app');
const ws = require('ws');

let wsServer;

function startWebSockets() {
    // make the websocket server
    wsServer = new ws.Server({ noServer: true });
    wsServer.on('connection', socket => {
        // this event is fired when a message is received
        socket.on('message', message => {
            console.log('Got message: ' + message.toString())
        })
    })

    // adds WebSocket support to Express server
    app.server.on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, socket => {
            wsServer.emit('connection', socket, request);
            console.log('here');
        });
    });
}

module.exports = startWebSockets;