exports.seed = async function(knex) {
  await knex('items').del();
  await knex('users').del();

  await knex('users').insert([
    { first_name: 'Epic', last_name: 'Name', username: 'admin', password: 'password' }
  ]);

  await knex('items').insert([
    { userId: 1, item_name: 'Laptop', description: 'A high-performance laptop for coding and gaming with a long description that exceeds 100 characters to test truncation...', quantity: 5 },
    { userId: 1, item_name: 'Mouse', description: 'Wireless mouse', quantity: 10 },
    { userId: 1, item_name: 'Laptop', description: 'A high-performance laptop for coding and gaming with a long description that exceeds 100 characters to test truncation...', quantity: 5 },
    { userId: 1, item_name: 'Mouse', description: 'Wireless mouse', quantity: 10 }
  ]);
};