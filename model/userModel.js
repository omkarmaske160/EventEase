const mongoose = require("mongoose")
const { stringify } = require("uuid")

const userModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        requied: true
    },
    user_id: {
        type: String,
        requied: true
    },
    fullName: {
        type: String,
        requied: true
    },
    type: {
        type: String,
        require: true
    }
}, { timestamps: true })
module.exports = mongoose.model("userdata", userModel)