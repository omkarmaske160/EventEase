const jwt = require("jsonwebtoken");

exports.userProtected = async (req, res, next) => {
    try {
        // console.log(req.cookies);
        const token = req.cookies.auth;


        // console.log(token);
        if (!token) {
            return res.status(400).json({
                message: "No cookie found"
            });
        }

        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                return res.status(400).json({
                    message: "JWT ERROR"
                });
            }
            // Set user_id in request body for later use
            req.body.user_id = decode.user_id;
            console.log("//////////a");
            console.log(req.body.user_id);
            console.log("//////////a");
            next();
        })
    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            message: "Login First"
        });
    }
};
