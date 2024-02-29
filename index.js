const express = require("express")
const { v4: uuid } = require("uuid")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./.env" })
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { userProtected } = require("./middleware/protected")


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("assets/eventImg"))
mongoose.connect(process.env.MONGO_URL)


// routes
app.use("/api/v1/events", require("./routes/eventRoute"))
app.use("/api/v2/auth", require("./routes/authRoute"))
app.use("/api/v2/user", userProtected, require("./routes/userRoute"))
app.use("/api/v2/admin", require("./routes/adminRoute"))
app.use("/api/v2/feedback", require("./routes/feedbackRoute"))
app.use("/api/v2/order", require("./routes/orderRoute"))
app.use("/api/v2/org", require("./routes/orgRoute"))


app.use("*", (req, res) => {
    res.status(400).json({
        message: "response not found"
    })
})


//mongo db connection 
mongoose.connection.once("open", () => {
    console.log("DATABASE CONNECTED ")
    app.listen(process.env.PORT, console.log("SERVER CONNECTED"))
})