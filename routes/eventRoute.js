const { getAllEvent, addEvent, getSelectedEventDetaile, getDisplayEvent, getSliderEvent, searchEvents } = require("../controller/eventController")

const AllEventRouter = require("express").Router()

AllEventRouter
    .get("/", getAllEvent)
    .get("/display-event/:no", getDisplayEvent)
    .get("/searchEvent/:searchTerm", searchEvents)

    .get("/events/:eventid", getSelectedEventDetaile)



module.exports = AllEventRouter