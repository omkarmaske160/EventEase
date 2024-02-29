const mongoose = require("mongoose")

const feedbackModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
    },
    fullName: {
        type: String,
        requied: true
    },
    message: {
        type: String,
        required: true
    }

}, { timestamps: true })
module.exports = mongoose.model("feedbackData", feedbackModel)