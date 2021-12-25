const express = require('express');
const api = require('./api');

// make an express app
const app = express();
const port = 3000;

// get the API routing started
app.use('/api', api);

// use the static directory to serve static html files
app.use(express.static('static'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});