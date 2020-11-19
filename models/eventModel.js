const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({

    eventName: {
        type: String,
        required: [true, "eventName is required field"]
    },
    eventType: {
        type: String,
        required: [true, "eventType is required field"]
    },
    location: {
        type: String,
        required: [true, "location is required field"]
    },
    date: {
        type: Date,
        required: [true, "Date is required field"]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const eventModel = mongoose.model("Events", EventSchema);

module.exports = eventModel;