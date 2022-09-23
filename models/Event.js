const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: false,
    },
    eventType: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    setCount: {
        type: Number,
        required: true,
    },
    dateRange: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        require: false,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    caption: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Event", EventSchema);