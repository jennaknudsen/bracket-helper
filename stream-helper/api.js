const express = require('express');

const router = express.Router();
router.post('/', (req, res) => {
    console.log('Got a POST request');
    console.log(req.body);
});

module.exports = router;