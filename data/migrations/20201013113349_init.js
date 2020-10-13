
exports.up = function(knex) {
    return knex.schema.createTable("roles", tbl => {
        tbl.increments();
        tbl.string("role").notNullable();
    })
    
    .createTable("users", tbl => {
        tbl.increments();
        tbl.string("username").notNullable().unique();
        tbl.string("password").notNullable();
        tbl.string("department").notNullable();

        tbl.integer("role")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("users")
  .dropTableIfExists("roles");

};
