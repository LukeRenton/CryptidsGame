/*
MAPSERVICE.JS
Type: service
Description: Provides access to the backend for retrieving the random map info
*/

// Function to fetch a random map based on mode and number of players
async function getMap(mode, players) {
     // Send a GET request to the server to fetch the map
    return await fetch(`/map/random-map?mode=${mode}&players=${players}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
})
    .then(response => response.json()) // Return the JSON response from the server
    // .catch(false);
}

export { getMap }