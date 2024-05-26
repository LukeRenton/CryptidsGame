/*
BOARDCONTROLLER.JS
Type: controller
Description: Provides controller for the board (parsing info, etc.)
*/

const fs = require('fs');
const rules_json = require("../maps/rules.json")
const hints_json = require("../maps/hints.json")
const path = require('path');

// I opted for verbosity over effeciency here, can write as [white, green, blue] and just append string + use modulo for looping 
const structures_order_normal = ["white_standing_stone", "green_standing_stone", "blue_standing_stone", "white_shack", "green_shack", "blue_shack"]
const structures_order_advanced = ["white_standing_stone", "green_standing_stone", "blue_standing_stone", "black_standing_stone", "white_shack", "green_shack", "blue_shack", "black_shack"]

//Converts a char to an integer
const processChar = (char) => {
  if (char == '0') {
    return 0;
  } else if (char == '1') {
    return 1;
  } else if (char == '2') {
    return 2;
  } else if (char == '3') {
    return 3;
  } else if (char == '4') {
    return 4;
  } else if (char == '5') {
    return 5;
  } else if (char == '6') {
    return 6;
  } else if (char == '7') {
    return 7;
  } else if (char == '8') {
    return 8;
  } else if (char == '9') {
    return 9;
  } else if (char == 'A') {
    return 10;
  } else if (char == 'B') {
    return 11;
  }
  throw new Error('Invalid character');
}

// Given a map code (from maps/intro) and a mode, deciphers the map code into tiles and pieces
const deciferMapCode = (mapCode, mapMode) => {
  const tiles = {};
  if (mapCode.length !== 18) {
    throw new Error('Invalid map code length');
  }

  if (mapMode !== "intro" && mapMode !== "normal") {
    throw new Error('Invalid mode');
  }

  for (let i = 0; i < 6; i++) {
      const tile_num = parseInt(mapCode[i], 16);
      tiles[i+1] = {
        "png_num" : mapCode[i],
        // Have to revert the flipped tiles index
        "tile_num" : tile_num > 6 ? tile_num - 6 : tile_num,
      }
  }

  // Select which mode to use (structures change accordingly)
  const structures = mapMode === "intro" ? structures_order_normal : structures_order_advanced;
  const pieces = {};
  let counter = 0;
  // Start from 6 since there is 6 in person tile pieces
  for (let i = 6; i < mapCode.length; i+=2){

    // Convert chars to integers
    const row = processChar(mapCode[i]);
    const col = processChar(mapCode[i+1]);
    
    // Retrieve which tile number we are on
    const tile_row = Math.floor(row/3);
    const tile_col = Math.floor(col/6);

    // Tile number corresponding to the actuall board game tile piece number
    const tile_num = tile_row*2 + tile_col + 1

    // This forces the boards into rectangle blocks of 3 * 6 length so we can work according to tile pieces
    const actual_row = row % 3;
    const actual_col = col % 6;
  
    pieces[structures[counter]] = {
      "row" : actual_row,
      "col" : actual_col,
      "globalRow" : row,
      "globalCol" : col,
      "tile_num" : tile_num
    }

    ++counter;
  }
  return {tiles, pieces};
}

// Since the json files are 1 indexed we just standardise it here
const formatFinalLocation = (location) => {
  const row_col = location.split(", ")
  return {
    "row" : row_col[0] - 1,
    "col" : row_col[1] - 1
  }
}

// Given an abbreviated rule we return the verbose version (according to Andrew's schema)
const verbositiseRules = (rules) => {
  const verbose_rules = [];
  rules.forEach(rule => {
    verbose_rules.push(rules_json[rule])
  });
  return verbose_rules;
}

// Given an abbreviated hint we return the verbose version (according to Andrew's schema)
const verbositiseHint = (hint) => {
  return hints_json[hint];
}

// Get a random board based on the mode and number of players
const getRandomBoard = (mode, player_count) => {
  // Get random map according to mode
  const directory_path = path.join(__dirname, '../maps', mode);
  const files = fs.readdirSync(directory_path);
  const random_file = files[Math.floor(Math.random() * files.length)];
  const file_path = path.join(directory_path, random_file);
  const content = fs.readFileSync(file_path, 'utf8');
  const possible_board_configs = JSON.parse(content);
  const possible_player_configs = possible_board_configs.players[player_count];

  // Each number of players theres like 5-10 possible configurations per map per number of players. So we pick a random configuration under a specific map.json
  const random_player_config = possible_player_configs[Math.floor(Math.random() * possible_player_configs.length)];
  const map = {
    "mapCode" : possible_board_configs.mapCode,
    "mode" : possible_board_configs.mode,
    "players" : player_count,
    "board" : deciferMapCode(possible_board_configs.mapCode, possible_board_configs.mode),
    "destination" : formatFinalLocation(random_player_config.destination),
    "rules": verbositiseRules(random_player_config.rules),
    "hint" : verbositiseHint(random_player_config.hint),
  }

  return map;
};


// Controller entry point to get a random map based on the mode and number of players
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
    res.status(422).json({ error: error.message });
  }
};

module.exports = {
  getRandomMapController,
  deciferMapCode
};
