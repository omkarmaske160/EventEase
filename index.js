const express = require("express")
const { v4: uuid } = require("uuid")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./.env" })
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { userProtected } = require("./middleware/protected")
const path = require("path")



const app = express()
app.use(cors({
    origin: "https://eventease-pln4.onrender.com",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("assets/eventImg"))
app.use(express.static(path.join(__dirname, "dist")))

mongoose.connect(process.env.MONGO_URL)


// routes
app.use("/api/v1/events", require("./routes/eventRoute"))
app.use("/api/v2/auth", require("./routes/authRoute"))
app.use("/api/v2/user", userProtected, require("./routes/userRoute"))
app.use("/api/v2/admin", require("./routes/adminRoute"))
app.use("/api/v2/feedback", require("./routes/feedbackRoute"))
app.use("/api/v2/order", require("./routes/orderRoute"))
app.use("/api/v2/org", require("./routes/orgRoute"))


// app.use("*", (req, res) => {
//     res.status(400).json({
//         message: "response not found"
//     })
// })

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))

})


//mongo db connection 
mongoose.connection.once("open", () => {
    console.log("DATABASE CONNECTED ")
    app.listen(process.env.PORT, console.log("SERVER CONNECTED"))
})