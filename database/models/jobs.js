const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    sleepUntil: {
        type: Date,
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("jobs", JobSchema);