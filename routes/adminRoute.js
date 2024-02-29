const { getAllEventAdmin, updateEventAdmin } = require("../controller/adminController")

const AllEventRouter = require("express").Router()

AllEventRouter
    .get("/admin-getAllEvent", getAllEventAdmin)
    .put("/admin-updateEvent/:_id", updateEventAdmin)

module.exports = AllEventRouter