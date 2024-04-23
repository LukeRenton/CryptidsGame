async function handleSignup(this_username, this_password) {
    const user = {
        username: this_username,
        password: this_password
    }
    return await fetch('/db/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
})
    .then(response => response)
    // .catch(false);
}

async function handleLogin(this_username, this_password) {
    const user = {
        username: this_username,
        password: this_password
    }
    return await fetch('/db/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
})
    .then(response => response)
    // .catch(false);
}

export { handleSignup, handleLogin}