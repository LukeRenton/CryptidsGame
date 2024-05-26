/*
DBCONTROLLER.TEST.JS
Type: jest test file
Description: Testing the login/signup and handling TDD of server
*/
const dbController = require('../../../controllers/dbController');

// TEST 1: addUser function -- test if we can add a user to the database
test("addUser function", async () => {
  const username = 'random-user-123';
  const password = 'random-user-password-123';

  // Setup the mock client
  const client = {
    query: jest.fn()
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ username, password }] }),
  };

  const result = await dbController.addUser(client, username, password);

  // Check if the queries were called correctly
  expect(client.query).toHaveBeenCalledWith('SELECT * FROM users WHERE username = $1;', [username]);
  expect(client.query).toHaveBeenCalledWith('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;', [username, password]);
  expect(result).toEqual({ username: 'random-user-123', password: 'random-user-password-123' });
});

// TEST 2: addUser function -- test that we can't add already existing user
test("addUser function -- user already exists", async () => {
  const client = {
    query: jest.fn().mockResolvedValue({ rows: [{ username: 'test', password: 'test' }] }),
  };
  const username = 'test';
  const password = 'test';

  await expect(dbController.addUser(client, username, password)).rejects.toThrow('User already exists');
});

// TEST 3: validateUserLogin function -- test if we can validate a user login
test("Valid user login", async () => {
  const client = {
    query: jest.fn().mockResolvedValue({ rows: [{ username: 'test', password: 'test' }] }),
  };
  const username = 'test';
  const password = 'test';

  const result = await dbController.validateUserLogin(client, username, password);

  expect(client.query).toHaveBeenCalledWith('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password]);
  expect(result).toBe(true);
});

// TEST 4: validateUserLogin function -- check if invalid username is rejected
test("Invalid username test", async () => {
  const client = {
    query: jest.fn().mockResolvedValue({ rows: [{ username: 'test', password: 'test' }] }),
  };
  const username = '912380741249u12-94821n12ipdun912-83ren21-9fn`0';
  const password = 'test';

  const result = await dbController.validateUserLogin(client, username, password);

  expect(client.query).toHaveBeenCalledWith('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password]);
  expect(result).toBe(true);
});

// TEST 4: validateUserLogin function -- check if invalid password is rejected
test("Invalid password test", async () => {
  const client = {
    query: jest.fn().mockResolvedValue({ rows: [{ username: 'test', password: 'test' }] }),
  };
  const username = 'test';
  const password = '912380741249u12-94821n12ipdun912-83ren21-9fn`0';

  const result = await dbController.validateUserLogin(client, username, password);

  expect(client.query).toHaveBeenCalledWith('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password]);
  expect(result).toBe(true);
});

// TEST 5: validateUserLogin function -- check if invalid username and password is rejected
test("Invalid password test", async () => {
  const client = {
    query: jest.fn().mockResolvedValue({ rows: [{ username: 'test', password: 'test' }] }),
  };
  const username = '912380741249u12-94821n12ipdun912-83ren21-9fn`0';
  const password = '12481ipnf-291nwqpioeurn9284h';

  const result = await dbController.validateUserLogin(client, username, password);

  expect(client.query).toHaveBeenCalledWith('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password]);
  expect(result).toBe(true);
});