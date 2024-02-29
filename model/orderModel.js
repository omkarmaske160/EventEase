const mongoose = require("mongoose")

const orderModel = new mongoose.Schema({
    user_name: String,
    user_id: String,
    email: String,
    tiket_count: Number,
    isPaid: Boolean,
    price: Number,
    order_id: String,
    event_title: String,
    booking_date: String,
    event_id: String,
    scan: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model("orderData", orderModel)