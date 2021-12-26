const ws = require('ws');
const fs = require('fs');
const verboseDebug = require('./verbose-debug');
const url = require('url');

const text_dir_name = 'text_files/';
const round_filename = 'round_name.txt';
const p1_filename = 'p1_name.txt';
const p1_score_filename = 'p1_score.txt';
const p2_filename = 'p2_name.txt';
const p2_score_filename = 'p2_score.txt';

// only save to text files if SAVE_TO_FILES environment variable is present
const saveToFiles = process.env.SAVE_TO_FILES ? process.env.SAVE_TO_FILES.toLowerCase() === 'true' : false;

// make the websocket server
const wsServer = new ws.Server({ noServer: true });

// create our folder for text files if it doesn't exist
const textFileFolderName = __dirname + '/' + text_dir_name;
if (saveToFiles && !fs.existsSync(textFileFolderName)) {
    fs.mkdirSync(textFileFolderName);
}

// holds "floating" values that the stream is currently using
let last_values = {
    round: "",
    p1_name: "",
    p1_losers: false,
    p1_score: 0,
    p2_name: "",
    p2_score: 0,
    p2_losers: false,
    senderID: "",
}

wsServer.on('connection', (socket, req) => {
    // assigns a unique ID to this socket based on query 
    socket.id = url.parse(req.url, true).query.id;

    // this event is fired when a message is received
    socket.on('message', message => {
        console.log('Got message: ' + message.toString())
        console.log('Message from: ' + socket.id)

        messageJson = JSON.parse(message);

        // simply return the information if the message has a 'get' property
        if (messageJson.get) {
            wsServer.clients.forEach(client => {
                // only send the last_values to specific requester
                if (client.id === socket.id) {
                    verboseDebug('Last values sent to client ' + client.id)
                    client.send(JSON.stringify(last_values))
                }
            })
        } else {
            const thisRound = messageJson.round;
            const thisP1Name = messageJson.p1_name;
            const thisP1Losers = messageJson.p1_losers;
            const thisP1Score = messageJson.p1_score;
            const thisP2Name = messageJson.p2_name;
            const thisP2Losers = messageJson.p2_losers;
            const thisP2Score = messageJson.p2_score;
        
            if (saveToFiles) {
                if (thisRound !== last_values.round) {
                    verboseDebug('Start updating round');
                    fs.writeFileSync(textFileFolderName + round_filename, thisRound, {flag: 'w'}, err => console.error(err));
                    verboseDebug('Round: ' + thisRound);
                    verboseDebug('Done updating');
                }
                if (thisP1Name !== last_values.p1_name || thisP1Losers !== last_values.p1_losers) {
                    verboseDebug('Start updating p1 name');
                    const name = thisP1Name.toUpperCase() + (thisP1Losers ? " [L]" : "");
                    fs.writeFileSync(textFileFolderName + p1_filename, name, {flag: 'w'}, err => console.error(err));
                    verboseDebug('Player 1: ' + name);
                    verboseDebug('Done updating');
                }
                if (thisP1Score !== last_values.p1_score) {
                    verboseDebug('Start updating p1 score');
                    fs.writeFileSync(textFileFolderName + p1_score_filename, thisP1Score, {flag: 'w'}, err => console.error(err));
                    verboseDebug('Player 1 Score: ' + thisP1Score);
                    verboseDebug('Done updating');
                }
                if (thisP2Name !== last_values.p2_name || thisP2Losers !== last_values.p2_losers) {
                    verboseDebug('Start updating p2 name');
                    const name = thisP2Name.toUpperCase() + (thisP2Losers ? " [L]" : "");
                    fs.writeFileSync(textFileFolderName + p2_filename, name, {flag: 'w'}, err => console.error(err));
                    verboseDebug('Player 2: ' + name);
                    verboseDebug('Done updating');
                }
                if (thisP2Score !== last_values.p2_score) {
                    verboseDebug('Start updating p2 score');
                    fs.writeFileSync(textFileFolderName + p2_score_filename, thisP2Score, {flag: 'w'}, err => console.error(err));
                    verboseDebug('Player 2 Score: ' + thisP2Score);
                    verboseDebug('Done updating');
                }
            }
        
            // update the last values
            last_values = {
                round: thisRound,
                p1_name: thisP1Name,
                p1_losers: thisP1Losers,
                p1_score: thisP1Score,
                p2_name: thisP2Name,
                p2_score: thisP2Score,
                p2_losers: thisP2Losers,
                senderID: socket.id,
            }

            // send message to each client (except itself)
            wsServer.clients.forEach(client => {
                verboseDebug('Client: ' + client.id)
                if (client.readyState === ws.OPEN) {
                    verboseDebug('Message sent.');
                    client.send(JSON.stringify(last_values));
                } else {
                    verboseDebug('Message not sent: Client is not open.');
                }
            });
        }
    
        console.log('Done with request.\n');
    })
})

module.exports.wsServer = wsServer;