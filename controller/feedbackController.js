const validator = require("validator");
const sendEmail = require("../util/emailShout");
const feedbackModel = require("../model/feedbackModel");

exports.feedback = async (req, res) => {
    try {
        const { email, fullName, message, user_id } = req.body;
        console.log(req.body);

        if (
            validator.isEmpty(email) ||
            validator.isEmpty(fullName) ||
            validator.isEmpty(message)
        ) {
            res.status(400).json({
                message: "all fields required"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "enter proper email"
            })
        }


        await feedbackModel.create({ email, fullName, message, user_id })

        await sendEmail({
            to: email,
            subject: "EventEase Feedback Responce",
            message: `<p>Thankyou for giveing feedback. We will work on your feedback.</p>
             `
        })

        res.status(201).json({ message: "feedback send successs" })
        // res.send('');
    } catch (error) {
        console.error('feedback is not send', error);
        res.status(400).send('Internal Server Error');
    }
}