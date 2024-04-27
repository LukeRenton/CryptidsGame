async function getMap(mode, players) {
    return await fetch(`/map/random-map?mode=${mode}&players=${players}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
})
    .then(response => response.json())
    // .catch(false);
}

export { getMap }