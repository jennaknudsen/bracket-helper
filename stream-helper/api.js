const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const text_dir_name = 'text_files/';
const round_filename = 'round_name.txt';
const p1_filename = 'p1_name.txt';
const p1_score_filename = 'p1_score.txt';
const p2_filename = 'p2_name.txt';
const p2_score_filename = 'p2_score.txt';

let last_values = {
    round: "",
    p1_name: "",
    p1_losers: false,
    p1_score: 0,
    p2_name: "",
    p2_score: 0,
    p2_losers: false,
}

const router = express.Router();
 
// create application/json parser
const jsonParser = bodyParser.json()

router.put('/', jsonParser, (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    console.log('Got a PUT request')

    const thisRound = req.body.round;
    const thisP1Name = req.body.p1_name;
    const thisP1Losers = req.body.p1_losers;
    const thisP1Score = req.body.p1_score;
    const thisP2Name = req.body.p2_name;
    const thisP2Losers = req.body.p2_losers;
    const thisP2Score = req.body.p2_score;

    // if any different values, write them
    const folderName = __dirname + '/' + text_dir_name;

    if (thisRound !== last_values.round) {
        console.log('Start updating round');
        fs.writeFileSync(folderName + round_filename, thisRound, {flag: 'w'}, err => console.error(err));
        console.log('Round: ' + thisRound);
        console.log('Done updating');
    }
    if (thisP1Name !== last_values.p1_name || thisP1Losers !== last_values.p1_losers) {
        console.log('Start updating p1 name');
        const name = thisP1Name + (thisP1Losers ? " [L]" : "");
        fs.writeFileSync(folderName + p1_filename, name, {flag: 'w'}, err => console.error(err));
        console.log('Player 1: ' + name);
        console.log('Done updating');
    }
    if (thisP1Score !== last_values.p1_score) {
        console.log('Start updating p1 score');
        fs.writeFileSync(folderName + p1_score_filename, thisP1Score, {flag: 'w'}, err => console.error(err));
        console.log('Player 1 Score: ' + thisP1Score);
        console.log('Done updating');
    }
    if (thisP2Name !== last_values.p2_name || thisP2Losers !== last_values.p2_losers) {
        console.log('Start updating p2 name');
        const name = thisP2Name + (thisP2Losers ? " [L]" : "");
        fs.writeFileSync(folderName + p2_filename, name, {flag: 'w'}, err => console.error(err));
        console.log('Player 2: ' + name);
        console.log('Done updating');
    }
    if (thisP2Score !== last_values.p2_score) {
        console.log('Start updating p2 score');
        fs.writeFileSync(folderName + p2_score_filename, thisP2Score, {flag: 'w'}, err => console.error(err));
        console.log('Player 2 Score: ' + thisP2Score);
        console.log('Done updating');
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
    }

    console.log('Done with request.\n')
    res.send(last_values);
});

module.exports = router;