'use strict';
const Jobs = require('../models/jobs');

const createNewJob = async (jobDetails) => {
    try {
        return await new Jobs(jobDetails).save();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewJob
}