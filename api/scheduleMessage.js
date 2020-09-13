'use strict';
const moment = require('moment');
const { ErrorHandler } = require('../errorHandler/index');
const { createNewJob } = require('../database/services/jobServices');
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('http-status-codes');

/**
 * Schedule Job to post a message at a given time
 * @param {*} req.body.message
 * @param {*} req.body.dateTime
 */
const scheduleMessage = async (req, res, next) => {
    const { dateTime, message } = req.body;
    try {
        if(!dateTime || !message)
            throw new ErrorHandler(BAD_REQUEST, 'Message and Date are required!')
        if(!moment(dateTime).isValid()) 
            throw new ErrorHandler(BAD_REQUEST, `Invalid date!`);
        if(!moment(dateTime).isBetween(moment(), moment().add(1, 'years'))) 
            throw new ErrorHandler(BAD_REQUEST, `Date should be in future and within 1 year span!`);

        const job = await createNewJob({
            sleepUntil: moment(dateTime).toISOString(),
            message
        });

        res.status(OK).json({ success: true, job });
    } catch (error) {
        if (typeof error !== ErrorHandler)
            error = new ErrorHandler(error.statusCode || INTERNAL_SERVER_ERROR, error.message || error);
        next(error);
    }
}

module.exports = {
    scheduleMessage
}