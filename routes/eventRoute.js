const { getAllEvent, addEvent, getSelectedEventDetaile, getDisplayEvent, getSliderEvent } = require("../controller/eventController")

const AllEventRouter = require("express").Router()

AllEventRouter
    .get("/", getAllEvent)
    .get("/display-event/:no", getDisplayEvent)
   
    .get("/events/:eventid", getSelectedEventDetaile)



module.exports = AllEventRouter