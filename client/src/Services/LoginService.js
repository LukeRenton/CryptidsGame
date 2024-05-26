/*
LOGINSERVICE.JS
Type: service
Description: Provides access to the backend for login/signup
*/

// Function to handle user signup
async function handleSignup(this_username, this_password) {
    // Construct user object with provided username and password
    const user = {
        username: this_username,
        password: this_password
    }
    // Send a POST request to the server for user registration
    return await fetch('/db/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
})
    .then(response => response)// Return the response from the server
    // .catch(false); // Optionally handle errors (commented out for simplicity)
}

// Function to handle user login
async function handleLogin(this_username, this_password) {
    // Construct user object with provided username and password
    const user = {
        username: this_username,
        password: this_password
    }
    // Send a POST request to the server for user login
    return await fetch('/db/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
})
    .then(response => response)// Return the response from the server
    // .catch(false);
}
// Export the handleSignup and handleLogin functions
export { handleSignup, handleLogin}