
exports.up = function(knex) {
  return knex.schema.table("users", tbl => {
      tbl.renameColumn("role", "role_id")
  })
};

exports.down = function(knex) {
  return knex.schema.table.dropColumn("role_id")
};
