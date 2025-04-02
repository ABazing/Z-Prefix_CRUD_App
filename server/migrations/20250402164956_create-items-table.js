exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('item_name').notNullable();
    table.string('description').notNullable();
    table.integer('quantity').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('items');
};