// deciferMapCode.test.js
const controller = require('../../../controllers/boardController');

test("decipher map code with normal (\"advanced\") mode", () => {
  const mapCode = '1A69B8588436798834058B';
  const mapMode = "normal";

  const expectedOutput = {
    tiles: {
      '1': { png_num: '1', tile_num: 1 },
      '2': { png_num: 'A', tile_num: 4 },
      '3': { png_num: '6', tile_num: 6 },
      '4': { png_num: '9', tile_num: 3 },
      '5': { png_num: 'B', tile_num: 5 },
      '6': { png_num: '8', tile_num: 2 },
    },
    pieces: {
      white_standing_stone: { row: '5', col: '8' },
      green_standing_stone: { row: '8', col: '4' },
      blue_standing_stone: { row: '3', col: '6' },
      black_standing_stone: { row: '7', col: '9' },
      white_shack: { row: '8', col: '8' },
      green_shack: { row: '3', col: '4' },
      blue_shack: { row: '0', col: '5' },
      black_shack: { row: '8', col: 'B' },
    },
  };

  const output = controller.deciferMapCode(mapCode, mapMode);
  expect(output).toEqual(expectedOutput);
});
