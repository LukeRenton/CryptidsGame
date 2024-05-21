// deciferMapCode.test.js
const controller = require('../../../controllers/boardController');

test("decipher map code with normal (\"advanced\") mode", () => {
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
