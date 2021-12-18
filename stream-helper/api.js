const express = require('express');
const bodyParser = require('body-parser')

const router = express.Router();
 
// create application/json parser
const jsonParser = bodyParser.json()

router.put('/', jsonParser, (req, res) => {
    console.log('Got a POST request');
    console.log(req.body);

    // public API: allow calls from any IP
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.send({'test': 'success'});
});

module.exports = router;