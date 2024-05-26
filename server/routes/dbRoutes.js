/*
DBROUTES.JS
Type: route
Description: Provides routes for login/signup
*/

const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Client } = require('pg');
const { addUser, validateUserLogin, removeUser } = require('../controllers/dbController');

// Create client object with paramaters from protected env variables
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});


// Connect to the PostgreSQL database
client.connect((err) => {
    if (err) {
      console.error('Failed to connect to PostgreSQL:', err.message);
    } else {
      console.log('Connected to PostgreSQL');
    }
  });  

// Route to add a new user
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req);
    console.log(username + ' ' + password);
    try {
        const newUser = await addUser(client, username, password);
        res.status(201).json(newUser); // Return the newly created user
    } catch (err) {
        res.status(500).json({ error: "User already exists" }); // Return error message if something goes wrong
    }
});

// Route to validate user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const isValidUser = await validateUserLogin(client, username, password);
    if (isValidUser) {
      res.status(200).json({ message: 'Login successful' }); // User found
    } else {
      res.status(401).json({ message: 'Invalid credentials' }); // User not found
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle error
  }
});

module.exports = router;