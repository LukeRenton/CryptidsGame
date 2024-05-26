/*
DECIFERMAPCODE.TEST.JS
Type: jest test file
Description: Testing the map code deciphering and handling TDD of server
*/
// deciferMapCode.test.js
const controller = require('../../../controllers/boardController');

// TEST 1: decifer map code with intro mode and a set map code which we know the answer to
test("decipher map code with normal (\"intro\") mode", () => {
  const mapCode = 'B46183084B18451521';
  const mapMode = "intro";

  //set test case expected output
  const expectedOutput = {
  tiles: {
    '1': { png_num: 'B', tile_num: 5 },
    '2': { png_num: '4', tile_num: 4 },
    '3': { png_num: '6', tile_num: 6 },
    '4': { png_num: '1', tile_num: 1 },
    '5': { png_num: '8', tile_num: 2 },
    '6': { png_num: '3', tile_num: 3 }
  },
  pieces: {
    white_standing_stone: { row: 0, col: 2, globalRow: 0, globalCol: 8, tile_num: 2 },
    green_standing_stone: { row: 1, col: 5, globalRow: 4, globalCol: 11, tile_num: 4 },
    blue_standing_stone: { row: 1, col: 2, globalRow: 1, globalCol: 8, tile_num: 2 },
    white_shack: { row: 1, col: 5, globalRow: 4, globalCol: 5, tile_num: 3 },
    green_shack: { row: 1, col: 5, globalRow: 1, globalCol: 5, tile_num: 1 },
    blue_shack: { row: 2, col: 1, globalRow: 2, globalCol: 1, tile_num: 1 }
  }
}

  //check the set corresponds to the expected output
  const output = controller.deciferMapCode(mapCode, mapMode);
  expect(output).toEqual(expectedOutput);
});

// TEST 2: make sure invalid map codes with less structures throws an error
test("decipher map code with invalid map code length", () => {
  const mapCode = 'AO2213093';
  const mapMode = "intro";

  // Check if invalid map code length is thrown
  expect(() => controller.deciferMapCode(mapCode, mapMode)).toThrow('Invalid map code length');
});

// TEST 3: make sure invalid map codes with more structures throws an error
test("decipher map code with invalid map code length", () => {
  const mapCode = 'AO221309312384AB213129213';
  const mapMode = "intro";

  // Check if invalid map code length is thrown
  expect(() => controller.deciferMapCode(mapCode, mapMode)).toThrow('Invalid map code length');
});

// TEST 4: make sure invalid characters in the map code throws an error
test("decipher map code with invalid characters", () => {
  const mapCode = 'B$G183084%18451521';
  const mapMode = "intro";

  // Check if invalid character is thrown
  expect(() => controller.deciferMapCode(mapCode, mapMode)).toThrow('Invalid character');
});

// TEST 5: make sure invalid mode throws an error
test("decipher map code with invalid mode", () => {
  const mapCode = 'B46183084B18451521';
  const mapMode = "invalid";

  // Check if invalid mode is thrown
  expect(() => controller.deciferMapCode(mapCode, mapMode)).toThrow('Invalid mode');
});
