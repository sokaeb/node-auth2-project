const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../api/config");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: "Invalid token" })
            } else {
                req.jwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "Not authorized."})
    }
};