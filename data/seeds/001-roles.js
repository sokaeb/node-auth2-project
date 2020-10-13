
exports.seed = function(knex) {
  const roles = [
    {
      role: "admin", // id: 1
    },
    {
      role: "user", // id: 2
    },
  ]

  return knex("roles").insert(roles)
};
