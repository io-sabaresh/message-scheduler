const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    scheduledAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Messages", MessageSchema);