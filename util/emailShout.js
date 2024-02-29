const nodemailer = require("nodemailer")
const sendEmail = ({ to, subject, message, html, attachments }) => new Promise((resolve, reject) => {
    try {
        const mailer = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FORM_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })

        mailer.sendMail({
            to,
            from: process.env.FORM_EMAIL,
            text: message,
            subject,
            html,
            attachments
        }, (err) => {
            if (err) {
                console.log(err);
                reject(err.message)
            }
            console.log("EMAIL SEND SUCCESS");
            resolve("EMAIL SEND SUCCESS")
        })
    } catch (error) {
        console.log(error)
        reject(error.message)
    }
})
module.exports = sendEmail