const { parse } = require("uuid")
const userModel = require("../model/userModel")
const { v4: uuid } = require("uuid")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { upload } = require("../util/imgUpload")
const validator = require("validator")
const sendEmail = require("../util/emailShout")



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userModel.findOne({ email });

        if (
            validator.isEmpty(email) ||
            validator.isEmpty(password)
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

        if (!result) {
            return res.status(401).json({
                message: 'Email is invalid'
            });
        }

        const passwordCheck = await bcrypt.compare(password, result.password);
        if (!passwordCheck) {
            return res.status(401).json({
                message: 'Invalid Password'
            });
        }

        const token = jwt.sign({ user_id: result.user_id }, process.env.JWT_KEY, { expiresIn: "3d" });
        res.cookie("auth", token, { maxAge: 60 * 60 * 60 * 12 });
        res.status(200).json({
            message: "User login successfully", result: {
                fullName: result.fullName,
                email: result.email,
                user_id: result.user_id,
                type: result.type
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || "Something went wrong" });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("auth")
        res.status(200).json({ message: "logout success" })
    } catch (error) {
        res.status(400).json({ message: "logout refuse" })

    }
}
exports.register = async (req, res) => {
    try {
        const { email, password, fullName, type } = req.body

        const existingUser = await userModel.findOne({ email })

        if (
            validator.isEmpty(email) ||
            validator.isEmpty(password) ||
            validator.isEmpty(fullName) ||
            validator.isEmpty(type)

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

        if (existingUser) {
            return res.status(400).json({
                message: "email is already exist"
            })
        }
        else {
            console.log(uuid());


            const hashPass = await bcrypt.hash(password, 10)
            const x = await sendEmail({
                to: email,
                subject: "Welcome to EventEase",
                message: `Thank you ${fullName} for registring with us`
            })

            await userModel.create({ ...req.body, password: hashPass, user_id: uuid() })

            res.status(200).json({ message: "user register successfully" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message || "something went wrong" })
    }
}


