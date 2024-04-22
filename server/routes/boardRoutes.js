const express = require('express');
const router = express.Router();
const { getRandomMapController } = require('../controllers/boardController'); // Importing the controller

// Route to fetch a random map based on the specified mode ('intro' or 'normal')

//base url will be /map

router.get('/random-map', getRandomMapController);

module.exports = router; // Exporting the router to be used in the main server
