async function addUser(client, username, password) {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;';
    const values = [username, password];
    const result = await client.query(query, values);
    console.log("in addUser")
    return result.rows[0]; // Return the newly added user
}

// Example function to validate user login
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
