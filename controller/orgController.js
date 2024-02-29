const allEventsModel = require("../model/allEventsModel")
const orderModel = require("../model/orderModel")

exports.getUserCreatedEvent = async (req, res) => {
    try {
        const { user_id } = req.params
        const result = await allEventsModel.find({ user_id })
        res.status(200).json({ message: "User Event Fetch successfully", result })
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}
exports.getAllBookedEvents = async (req, res) => {
    try {
        const { event_id } = req.params
        const result = await orderModel.find({ event_id })
        res.status(200).json({ message: "User Event Fetch successfully", result })
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}