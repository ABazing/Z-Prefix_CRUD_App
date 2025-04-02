# Z-Prefix App

### How to Install the App

1. After cloning the project, set up your PostgreSQL database.
    - psql -U postgres -h localhost
    - CREATE DATABASE inventory_manager;

2. Setting up the server side
    - cd server
    - npm install
    - Within the server directory edit your .env file, most importantly your DB_USER and DB_PASSWORD, or you can leave it.
    - Run the migration and seed the database
      - npx knex migrate:latest
      - npx knex seed:run
    - Start the server
      - npm start

3. Setting up the client side
    - cd client
    - npm install
    - npm run dev

### Features
  1. **Inventory Managers**:
      - Can log into exisiting accounts.
      - Can create accounts.
      - Once logged in can see items they've created.
      - Can also view all items created by other inventory managers.
      - Can create items for the world to see!
      - Can edit items they've created as well as delete.

  2. **Visitors**:
      - Can view all items created by Inventory Managers.
      - Can click on items and view a details page about the item.

### How to login.
  After following the "How to Install the App" instructions above you can do the following:
  1. Visit http://localhost:5173, and use one of the follow pre-existing accounts.
      - (username: admin password: password)
      - (username: user2 password: password123)
  3. Or click "Register an Account", enter your info and then login.
  4. Or click "View All Inventories" to see all items already loaded in the DB.
