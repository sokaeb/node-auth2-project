const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-mw");

router.get("/", restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json({ 
            data: users
        });
    })
    .catch(err => {
        res.status(500).json({ message: "Failed getting users."});
    });
});

router.get("/:id", (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(user.id == req.params.id){
                res.status(200).json({ data: user })
            } else {
                res.status(500).json({ message: "Incorrect user id."})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "User with that id does not exist."})
        })
})

router.post("/", (req, res) => {
    const newUser = req.body;

    Users.addUser(newUser)
    .then(newUser => {
        res.status(201).json({ data: newUser })
    })
    .catch(err => {
        res.status(500).json({ message: "Failed adding user."});
    });
});

router.put("/:id", (req, res) => {
    const changes = req.body;

    Users.updateUser(req.params.id, changes)
    .then(user => {
        res.status(200).json({ data: user })
    })
    .catch(err => {
        res.status(500).json({ message: "Failed updating user."});
    });
});

module.exports = router;