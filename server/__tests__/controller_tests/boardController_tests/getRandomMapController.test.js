const request = require('supertest'); // for HTTP requests in tests
const express = require('express');
const controller = require('../../../controllers/boardController'); // adjust path accordingly

const app = express();
app.get('/randomMap', controller.getRandomMapController); // set up the endpoint

test("should return a valid map for intro mode with 3 players", async () => {
    const res = await request(app)
        .get('/randomMap')
        .query({ mode: 'intro', players: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mapCode');
    expect(res.body).toHaveProperty('mode', 'intro');
    expect(res.body).toHaveProperty('players', 3);
});

test("should return an error for invalid mode", async () => {
    const res = await request(app)
        .get('/randomMap')
        .query({ mode: 'invalid', players: 3 });

    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('error', 'Invalid or missing mode');
});

test("should return invalid for less than 2 players", async () => {
    const res = await request(app)
        .get('/randomMap')
        .query({ mode: 'intro', players: -1 });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('error', 'Invalid or missing number of players');
});
  
test("should return invalid for more than 6 players", async () => {
    const res = await request(app)
        .get('/randomMap')
        .query({ mode: 'intro', players: 6 });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('error', 'Invalid or missing number of players');
});