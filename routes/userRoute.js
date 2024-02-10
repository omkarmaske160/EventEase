const { addEvent, getUserCreatedEvent, updateUserCreatedEvent, deleeteUserCreatedEvent } = require("../controller/userController")
const userRouter = require("express").Router()

userRouter
    .post("/create-event", addEvent)
    .get("/getUserCreatedEvents/:user_id", getUserCreatedEvent)
    .put("/updatetUserCreatedEvents/:user_id", updateUserCreatedEvent)
    .delete("/deleteUserCreatedEvents/:user_id", deleeteUserCreatedEvent)


module.exports = userRouter  