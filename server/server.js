const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Set the port for your server

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World! This is your Express server.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
