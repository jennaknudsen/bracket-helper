const express = require('express');
const api = require('./api');
const startWebSockets = require('./websocket');
// const websocket = require('./websocket');

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

// export server to use in websocket implementation
module.exports.server = server;

// add websockets support
startWebSockets();