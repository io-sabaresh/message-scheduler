'use strict';
const { MONGO_CONNECTION_STRING, DB_NAME } = require('../constants');
const { MongoClient } = require('mongodb');
const { MongoCron } = require('mongodb-cron');
const { postNewMessage } = require('../database/services/messageService');

/**
 * Posts Message in Messages collection
 * @param {*} doc 
 */
const postMessage = async (doc) => {
    try {
        await postNewMessage({
            message: doc.message,
            scheduledAt: doc.createdAt
        });
    } catch (error) {
        console.log("error: ", error);
    }
}

const startMessageScheduler = async () => {
    const mongo = await MongoClient.connect(MONGO_CONNECTION_STRING, { useUnifiedTopology: true });

    console.log("Mongo Client connected");
    const db = mongo.db(DB_NAME);
    const collection = db.collection('jobs');

    const cron = new MongoCron({
        collection, // a collection where jobs are stored
        onDocument: postMessage, // triggered on job processing
        onError: async (err) => console.log("err: ", err), // triggered on error
    });

    cron.start();
    console.log("Cron started!");
};

module.exports = {
    startMessageScheduler
}