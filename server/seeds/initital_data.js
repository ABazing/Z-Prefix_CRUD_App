exports.seed = async function(knex) {
  await knex('items').del();
  await knex('users').del();

  await knex('users').insert([
    { first_name: 'Tom', last_name: 'Nook', username: 'admin', password: 'password' },
    { first_name: 'David', last_name: 'Green', username: 'user2', password: 'password123' }
  ]);

  await knex('items').insert([
    { userId: 1, item_name: 'Whole Milk', description: 'Ancient Milk Preservation: In the past, when refrigeration was not available, people tried various methods to keep milk fresh. The Frog Method.', quantity: 20 },
    { userId: 1, item_name: 'White Bread', description: 'Before rubber erasers, a rolled-up piece of white bread was used to erase graphite, making it a surprisingly useful tool for a different purpose than just eating.', quantity: 30 },
    { userId: 1, item_name: 'Peanut Butter', description: 'Astronauts enjoy peanut butter on tortillas in space.', quantity: 15 },
    { userId: 1, item_name: 'Toilet Paper', description: 'It takes about 384 trees to make the toilet paper that one man uses within his lifetime.', quantity: 50 },
    { userId: 1, item_name: 'Laundry Detergent', description: 'These are not the pod ones, so do not eat them!', quantity: 10 },
    { userId: 1, item_name: 'Canned Tomatoes', description: 'They last for 100 years.', quantity: 40 },
    { userId: 2, item_name: 'Shampoo', description: 'This is a Six - One formula. From brushing your teeth, changing your oil and yes even washing your hair!', quantity: 25 },
    { userId: 2, item_name: 'Paper Towels', description: 'Paper towels are consumed the most by Americans.', quantity: 60 },
    { userId: 2, item_name: 'Pasta', description: 'A 1-pound box of spaghetti.', quantity: 35 },
    { userId: 2, item_name: 'Toothpaste', description: 'Tasted better than the shampoo!', quantity: 45 }
  ]);
};