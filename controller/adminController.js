const allEventsModel = require("../model/allEventsModel")

exports.getAllEventAdmin = async (req, res) => {
    try {
        const result = await allEventsModel.find()
        res.status(200).json({ message: "Event Fetch successfully", result })
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}
exports.updateEventAdmin = async (req, res) => {
    try {
        const { _id } = req.params
        // console.log("//////", _id);
        await allEventsModel.findByIdAndUpdate(_id, req.body)
        res.status(200).json({ message: "Event Update successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}