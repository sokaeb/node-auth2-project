
exports.up = function(knex) {
  return knex.schema.alterTable("users", tbl => {
      tbl.integer("role_id").alter();
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("users", tbl => {
      tbl.alterTable("users")
  })
};
