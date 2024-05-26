/*
GETRANDOMMAPCONTROLLER.TEST.JS
Type: jest test file
Description: Testing the random map controller and handling TDD of server
*/
const request = require('supertest'); // for HTTP requests in tests
const express = require('express');
const controller = require('../../../controllers/boardController'); // Import the controller

const app = express();
app.get('/randomMap', controller.getRandomMapController); // set up the endpoint


// Below is all the boundary testing for the getRandomMapController

// TEST 1: Should return a valid map for normal mode with 3 players
test("should return a valid map for intro mode with 3 players", async () => {
    const res = await request(app)
        .get('/randomMap')
        .query({ mode: 'intro', players: 3 });

    // NOTE: we can't check the dicipher of the map exactly since it's random, but we can check the structure
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mapCode');
    expect(res.body).toHaveProperty('mode', 'intro');
    expect(res.body).toHaveProperty('players', 3);
});


// TEST 2: Should return an error for invalid mode
test("should return an error for invalid mode", async () => {
    const res = await request(app)
        .get('/randomMap')
        .query({ mode: 'invalid', players: 3 });

    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('error', 'Invalid or missing mode');
});

// TEST 3: Should return an error for invalid number of players (less than 2)
test("should return invalid for less than 2 players", async () => {
    const res = await request(app)
        .get('/randomMap')
        .query({ mode: 'intro', players: -1 });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('error', 'Invalid or missing number of players');
});
  
// TEST 4: Should return an error for invalid number of players (more than 6)
test("should return invalid for more than 6 players", async () => {
    const res = await request(app)
        .get('/randomMap')
        .query({ mode: 'intro', players: 6 });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('error', 'Invalid or missing number of players');
});