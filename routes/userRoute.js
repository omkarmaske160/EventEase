const { addEvent, getUserCreatedEvent, updateUserCreatedEvent, deleeteUserCreatedEvent, generateQrCode, getUserBookedEvent } = require("../controller/userController")
const userRouter = require("express").Router()

userRouter
    .post("/create-event", addEvent)
    .get("/getUserBookedEvents/:user_id", getUserBookedEvent)
    .post("/generateQrCode/:userEmail", generateQrCode)
    .put("/updatetUserCreatedEvents/:user_id", updateUserCreatedEvent)
    .delete("/deleteUserCreatedEvents/:user_id", deleeteUserCreatedEvent)


module.exports = userRouter  