const { getAllBookedEvents, getUserCreatedEvent } = require("../controller/orgController")
const userRouter = require("express").Router()

userRouter
    .get("/getUserCreatedEvents/:user_id", getUserCreatedEvent)
    .get("/getUserBookedEvents/:event_id", getAllBookedEvents)


module.exports = userRouter  