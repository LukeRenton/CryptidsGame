/*
SERVER.TEST.JS
Type: jest test file
Description: Testing the server and handling TDD of server
*/

const request = require('supertest');
const path = require('path');
const express = require('express');
const boardRoutes = require('../routes/boardRoutes');


// Import the Express app
const createApp = require('../server');

// Mock the app setup
const app = express();
app.use(express.json({ type: '*/*' })); 
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use("/map", boardRoutes);

const reactRoutes = ['/'];
app.get(reactRoutes, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

describe('Express App Tests', () => {
  // Test the static files endpoint
  test('should serve static files from React app', async () => {
    const response = await request(app).get('/'); // test the root route
    expect(response.status).toBe(200); // expect 200 OK
    expect(response.text).toContain('<!doctype html>'); // check if HTML content is returned
  });

  // Test /map route
  test('should handle /map/test route', async () => {
    const response = await request(app).get('/map/random-map?mode=intro&players=4');
    expect(response.status).toBe(200);
  });
});
