const db = require("../data/db-config");

module.exports = {
    find,
    findBy,
    findById,
    addUser,
    updateUser
}

function find() {
    return db("users")
    .select("id", "username", "department")
    .orderBy("id");
}

function findBy(filter) {
    return db("users")
    .where(filter)
}

function findById(id) {
    return db("users")
    .where({ id })
    .first();
}

function addUser(user) {
    return db("users")
    .insert(user, "id")
    .then(ids => {
        const id = ids[0];

        return findById(id);
    })
    .catch(err => {
        console.log(err)
    });
}

function updateUser(id, changes) {
    return db("users")
    .where({ id })
    .update(changes)
    .then(user => {
        const userId = id[0];

        return findById(userId);
    })
}