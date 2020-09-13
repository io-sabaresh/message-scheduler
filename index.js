const express = require('express');
const app = express();
// Imports
const morgan = require("morgan");
const { PORT } = require('./constants');
const bodyParser = require("body-parser");
const { handleError } = require('./errorHandler');
const { scheduleMessage } = require('./api/scheduleMessage');

const dbConnection = require('./database/config');
const { startMessageScheduler } = require('./jobs/messageScheduler');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Logger for requests
app.use(morgan("dev"));

// API Routes
app.post('/message', scheduleMessage);

// Error Handler
app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(PORT, (error, data) => {
    if (error) console.log("Error Occurred while startign the server");
    else {
        console.log("Connected to the server");
        dbConnection;
        startMessageScheduler();
    }
});