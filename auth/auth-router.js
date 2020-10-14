const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../api/config");
const router = require("express").Router();

const Users = require("../users/users-model");
const { isValid } = require("../users/users-service");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcrypt.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.addUser(credentials)
        .then(user => {
            res.status(201).json({ data: user });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
    } else {
        res.status(400).json({
            message: "Please provide a username and password."
        });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = getJwt(user);

                res.status(200).json({
                    message: "You are now logged in.",
                    token
                });
            } else {
                res.status(401).json({ 
                    message: "Invalid credentials"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        })
    } else {
        res.status(400).json({
            message: "Please provide a username and password."
        });
    }
});

function getJwt(user) {
    const payload = {
      username: user.username,
      role: user.role
    };
  
    const jwtOptions = {
      expiresIn: '8h',
    }
    return jwt.sign(payload, config.jwtSecret, jwtOptions)
  };


module.exports = router;