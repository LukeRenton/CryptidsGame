const dbController = require('../../../controllers/dbController');

test("addUser function", async () => {
  const client = {
    query: jest.fn().mockResolvedValue({ rows: [{ username: 'test', password: 'test' }] }),
  };
  const username = 'test';
  const password = 'test';

  const result = await dbController.addUser(client, username, password);

  expect(client.query).toHaveBeenCalledWith('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;', [username, password]);
  expect(result).toEqual({ username: 'test', password: 'test' });
});

test("validateUserLogin function", async () => {
  const client = {
    query: jest.fn().mockResolvedValue({ rows: [{ username: 'test', password: 'test' }] }),
  };
  const username = 'test';
  const password = 'test';

  const result = await dbController.validateUserLogin(client, username, password);

  expect(client.query).toHaveBeenCalledWith('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password]);
  expect(result).toBe(true);
});