const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080; // Set the port for your server

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World! This is your Express server.');
});

app.use(express.static('./client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,"client", "build", 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
