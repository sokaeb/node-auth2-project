const express = require("express");
const helmet = require("helmet");

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({
        api: "up and running"
    })
});


module.exports = server;