const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// thanks HTTP Cats!
const authenticateUser = async (req, res, next) => {
  const userId = req.headers['x_user_id'];
  const user = await knex('users').where({ id: userId }).first();
  req.user = user;
  next();
};

// Register
app.post('/register', async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  try {
    const [user] = await knex('users').insert({ first_name, last_name, username, password }).returning('*');
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await knex('users').where({ username, password }).first();
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json(user);
});

// Get all items
app.get('/items', async (req, res) => {
  const items = await knex('items').select();
  res.json(items.map(item => ({
    ...item,
    description: item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description
  })));
});

// Get single item
app.get('/items/:id', async (req, res) => {
  const item = await knex('items').where({ id: req.params.id }).first();
  if (!item) return res.sendStatus(404);
  res.json(item);
});

// Get user's items
app.get('/my_items', authenticateUser, async (req, res) => {
  const items = await knex('items').where({ userId: req.user.id });
  res.json(items.map(item => ({
    ...item,
    description: item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description
  })));
});

// Create item
app.post('/items', authenticateUser, async (req, res) => {
  const { item_name, description, quantity } = req.body;
  const [item] = await knex('items').insert({ userId: req.user.id, item_name, description, quantity }).returning('*');
  res.status(201).json(item);
});

// Update item
app.put('/items/:id', authenticateUser, async (req, res) => {
  const { item_name, description, quantity } = req.body;
  const [item] = await knex('items').where({ id: req.params.id, userId: req.user.id }).update({ item_name, description, quantity }).returning('*');
  if (!item) return res.sendStatus(404);
  res.json(item);
});

// Delete item
app.delete('/items/:id', authenticateUser, async (req, res) => {
  const deleted = await knex('items').where({ id: req.params.id, userId: req.user.id }).del();
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));