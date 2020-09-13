'use strict';
const Messages = require('../models/messages');

const postNewMessage = async (messageDetails) => {
    try {
        return await new Messages(messageDetails).save();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    postNewMessage
}