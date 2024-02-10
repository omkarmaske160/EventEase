
const jwt = require("jsonwebtoken");

const allEventsModel = require("../model/allEventsModel");
const { upload } = require("../util/imgUpload")



exports.addEvent = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    message: err.message || "Unable to upload image",
                });
            }
            const token = req.cookies.auth;
            jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                if (err) {
                    return res.status(400).json({
                        message: "JWT ERROR"
                    });
                }
                // Set user_id in request body for later use
                req.body.user_id = decode.user_id;
            })

            if (!req.file || !req.file.filename) {
                return res.status(400).json({
                    message: "File not received or filename not provided",
                });
            }

            console.log(req.body);
            await allEventsModel.create({ ...req.body, event_img: req.file.filename });
            res.status(201).json({ message: "Event added successfully" });
        });
    } catch (error) {
        res.status(400).json({ message: error.message || "Something went wrong" });
    }
};

exports.getUserCreatedEvent = async (req, res) => {
    try {
        const { user_id } = req.params
        const result = await allEventsModel.find({ user_id })
        res.status(200).json({ message: "User Event Fetch successfully", result })
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}
exports.updateUserCreatedEvent = async (req, res) => {
    try {
        const { user_id } = req.params
        const result = await allEventsModel.findByIdAndUpdate(user_id, req.body)
        res.status(200).json({ message: "User Event Update successfully", result })
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}

exports.deleeteUserCreatedEvent = async (req, res) => {
    try {
        const { user_id } = req.params
        const result = await allEventsModel.findOneAndDelete(user_id)
        res.status(200).json({ message: "User Event Delete successfully", result })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}

