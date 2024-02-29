const { feedback } = require("../controller/feedbackController")
const feedbackRouter = require("express").Router()

feedbackRouter

    .post("/feedback", feedback)



module.exports = feedbackRouter  