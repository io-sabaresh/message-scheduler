require('dotenv').config();

module.exports = {
    // Server Port
    PORT: process.env.PORT || 5100,
    // MongoDB connection String
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    // Database Name
    DB_NAME: process.env.DATA_BASE
}