const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Client } = require('pg');
const { addUser, validateUserLogin } = require('../controllers/dbController');

// Create PostgreSQL client instance
function createClient() {
  return new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

let client;

// Connect to PostgreSQL
async function connectClient() {
  client = createClient();
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
  } catch (err) {
    console.error('Failed to connect to PostgreSQL:', err.message);
    throw err;
  }
}

(async () => {
  try {
    await connectClient();
  } catch (err) {
    console.error("Critical: Can't start server. Exiting.", err.message);
    process.exit(1); // Exit if PostgreSQL connection fails
  }
})();

// Middleware to ensure client connection is ready before routing
router.use(async (req, res, next) => {
  if (!client) {
    return res.status(503).json({ error: 'Database connection unavailable' });
  }
  next(); // If client is available, proceed with the request
});

// Route to add a new user
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await addUser(client, username, password);
    res.status(201).json(newUser); // Return the newly created user
  } catch (err) {
    next(err); // Pass error to error handler middleware
  }
});

// Test route
router.get('/test', (req, res) => {
  res.status(200).send("Success");
});

// Route to validate user login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isValidUser = await validateUserLogin(client, username, password);
    if (isValidUser) {
      res.status(200).json({ message: 'Login successful' }); // User found
    } else {
      res.status(401).json({ message: 'Invalid credentials' }); // User not found
    }
  } catch (err) {
    next(err); // Pass error to error handler middleware
  }
});

// Centralized error handler middleware
router.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' }); // General error response
});

// Clean up PostgreSQL client when the server exits
process.on('exit', () => {
  if (client) {
    client.end();
  }
});

module.exports = router;