const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const boardRoutes = require('./routes/boardRoutes');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));


app.use("/map", boardRoutes);

// Handle requests to root URL - send the React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
