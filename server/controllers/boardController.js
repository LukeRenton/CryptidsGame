const fs = require('fs');
const path = require('path');

const deciferMapCode = (mapCode) => {
  const tiles = {};
  for (let i = 0; i < mapCode.length; i++) {
    if (i<6){
      tiles[i+1] = mapCode[i];
    }
  }
  return tiles;

}
console.log(deciferMapCode('1A2B3670694207638A'));


const getRandomBoard = (mode, player_count) => {
  const directory_path = path.join(__dirname, '../maps', mode);
  const files = fs.readdirSync(directory_path);

  if (files.length === 0) {
    throw new Error('No maps found');
  }

  const random_file = files[Math.floor(Math.random() * files.length)];
  const file_path = path.join(directory_path, random_file);
  const content = fs.readFileSync(file_path, 'utf8');
  const possible_board_configs = JSON.parse(content);
  const possible_player_configs = possible_board_configs.players[player_count];

  const random_player_config = possible_player_configs[Math.floor(Math.random() * possible_player_configs.length)];
  const map = {
    "mapCode" : possible_board_configs.mapCode,
    "mode" : possible_board_configs.mode,
    "players" : player_count,
    "destination" : random_player_config.destination,
    "rules": random_player_config.rules,
    "hint" : random_player_config.hint,
  }

  return map;
};

const getRandomMapController = (req, res) => {
  try {
    const mode = req.query.mode;
    const players = parseInt(req.query.players);
    if (!mode || (mode !== 'intro' && mode !== 'normal')) {
      throw new Error('Invalid or missing mode');
    }

    if (!players || players < 2 || players > 5) {
      throw new Error('Invalid or missing number of players');
    }

    const map = getRandomBoard(mode, players);
    res.json(map);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRandomMapController,
};
