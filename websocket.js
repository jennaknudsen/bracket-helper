const app = require('./app');
const ws = require('ws');

// make the websocket server
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    // this event is fired when a message is received
    socket.on('message', message => {
        console.log('Got message: ' + message.toString())
    })
})

module.exports.wsServer = wsServer;