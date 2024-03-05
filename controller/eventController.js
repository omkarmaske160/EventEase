const allEventsModel = require("../model/allEventsModel")

exports.getAllEvent = async (req, res) => {
    try {
        const result = await allEventsModel.find({ active: true })
        res.status(200).json({ message: "Event Fetch successfully", result })
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}

exports.getSelectedEventDetaile = async (req, res) => {
    try {
        const eventid = req.params.eventid;
        const result = await allEventsModel.findById(eventid)
        res.status(200).json({ message: "Event Fetch successfully", result })
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}

exports.getDisplayEvent = async (req, res) => {
    try {
        const no = req.params.no;
        const result = await allEventsModel.find({ active: true }).limit(no);
        res.status(200).json({ message: "Events fetched successfully", result });
    } catch (error) {
        res.status(400).json({ message: error.message || "Something went wrong" });
    }
};

exports.searchEvents = async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try {
        // Search events where event_title, event_desc, or event_guest contains the searchTerm
        const events = await allEventsModel.find({
            $or: [
                { event_title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search
                { event_desc: { $regex: searchTerm, $options: 'i' } },
                { event_guest: { $regex: searchTerm, $options: 'i' } }
            ]
        });

        res.json(events);
    } catch (error) {
        console.error('Error searching events:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};






