/*
SERVER.JS
Type: server js file
Description: Overall backend handling
*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const boardRoutes = require('./routes/boardRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json({ type: '*/*' })); 

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// give map to boardRoutes
app.use("/map", boardRoutes);

if (process.env.NODE_ENV !== 'test') {
  // give db to dbRoutes
  const dbRoutes = require('./routes/dbRoutes');
  app.use("/db", dbRoutes);
}


// Handle requests to main react page
// NOTE: THIS CODE HAS TO BE AT THE END OF THE FILE

const reactRoutes = [
  '/',
  '/tutorial',
  '/login',
  '/register',
  '/lobby',
  '/game'
]
app.get(reactRoutes, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server

if (process.env.NODE_ENV !== 'test') {
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}