const mongoose = require("mongoose")

const AllEventSchema = mongoose.Schema({
    event_title: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    event_desc: {
        type: String,
        required: true
    },
    event_guest: {
        type: String,
        require: true
    },
    event_img: {
        type: String,
        required: true
    },
    event_date: {
        type: String,
        required: true
    },
    event_time: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    event_price: {
        type: Number,
        required: true
    },
    event_location: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("AllEvents", AllEventSchema)