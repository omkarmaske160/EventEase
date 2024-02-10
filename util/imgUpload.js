const multer = require("multer")
const { v4: uuid } = require("uuid")
const path = require("path")

const storage = multer.diskStorage({
    filename: (req, file, cd) => {
        const ext = path.extname(file.originalname)
        const fn = uuid() + ext
        cd(null, fn)
    },
    destination: (req, res, cd) => {
        cd(null, "assets/eventImg")
    }
})

exports.upload = multer({
    storage
}).single("event_img")
