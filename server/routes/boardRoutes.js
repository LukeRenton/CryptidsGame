const express = require('express');
const router = express.Router();
const { getRandomMapController } = require('../controllers/boardController'); // Importing the controller

// Route to fetch a random map based on the specified mode ('intro' or 'normal')

//base url will be /map

//passes this to the controller to get the map
router.get('/random-map', getRandomMapController);

//test for board routes
router.get('/test', async(req, res) => {
    res.status(200).send("Success");
  })

module.exports = router; // Exporting the router to be used in the main server
