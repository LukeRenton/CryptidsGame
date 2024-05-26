/*
DBCONTROLLER.JS
Type: controller
Description: Provides controller for the database for login/signup
*/

// Function to add a user to the database
async function addUser(client, username, password) {
    // First check if the user already exists
    const checkQuery = 'SELECT * FROM users WHERE username = $1;';
    const checkValues = [username];
    const checkResult = await client.query(checkQuery, checkValues);
    if (checkResult.rows.length > 0) {
        throw new Error('User already exists');
    }
    // If user does not exist, add the user
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;';
    const values = [username, password];
    const result = await client.query(query, values);
    return result.rows[0]; // Return the newly added user
}

// Function to validate user login
async function validateUserLogin(client, username, password) {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2;';
    const values = [username, password];
    const result = await client.query(query, values);
    return result.rows.length > 0; // Return true if user exists, false otherwise
}

// Export the functions to use them in routes
module.exports = {
    addUser,
    validateUserLogin
};
