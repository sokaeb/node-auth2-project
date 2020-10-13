
exports.seed = function(knex) {
 const users = [
   {
    username: "Apple",
    password: "password",
    department: "administration",
    role: 1
   },
   {
     username: "Banana",
     password: "password",
     department: "consumer",
     role: 2
   },
 ];

 return knex("users").insert(users);
};
