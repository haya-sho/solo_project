/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.dropTable("menu_list");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.createTable("menu_list", function (table) {
    table.increments("id").primary(); // Set this column as the primary key
    table.string("menu", 64).notNullable();
    table.string("category", 32);
  });
};
