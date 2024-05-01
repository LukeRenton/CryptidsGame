import Tile from "./Tile.js";

const tile_map = {};

const w = "water";
const m = "mountain";
const f = "forest";
const s = "swamp";
const d = "desert";
const bear = "bear";
const cougar = "cougar"
const A = "A";
const B = "B";
const C = "C";

//Below code was generated using "board_string_generator.py" in the project
tile_map[1] = [
    new Tile(1, 0, 0, w),
    new Tile(1, 0, 1, w),
    new Tile(1, 0, 2, w),
    new Tile(1, 0, 3, w),
    new Tile(1, 0, 4, f),
    new Tile(1, 0, 5, f),

    new Tile(1, 1, 0, s),
    new Tile(1, 1, 1, s),
    new Tile(1, 1, 2, w),
    new Tile(1, 1, 3, d),
    new Tile(1, 1, 4, f),
    new Tile(1, 1, 5, f),

    new Tile(1, 2, 0, s),
    new Tile(1, 2, 1, s),
    new Tile(1, 2, 2, d),
    new Tile(1, 2, 3, d, bear),
    new Tile(1, 2, 4, d, bear),
    new Tile(1, 2, 5, f, bear)
];

tile_map[2] = [
    new Tile(2, 0, 0, s, cougar),
    new Tile(2, 0, 1, f, cougar),
    new Tile(2, 0, 2, f, cougar),
    new Tile(2, 0, 3, f),
    new Tile(2, 0, 4, f),
    new Tile(2, 0, 5, f),

    new Tile(2, 1, 0, s),
    new Tile(2, 1, 1, s),
    new Tile(2, 1, 2, f),
    new Tile(2, 1, 3, d),
    new Tile(2, 1, 4, d),
    new Tile(2, 1, 5, d),

    new Tile(2, 2, 0, s),
    new Tile(2, 2, 1, m),
    new Tile(2, 2, 2, m),
    new Tile(2, 2, 3, m),
    new Tile(2, 2, 4, m),
    new Tile(2, 2, 5, d)
];

tile_map[3] = [
    new Tile(3, 0, 0, s),
    new Tile(3, 0, 1, s),
    new Tile(3, 0, 2, f),
    new Tile(3, 0, 3, f),
    new Tile(3, 0, 4, f),
    new Tile(3, 0, 5, w),

    new Tile(3, 1, 0, s, cougar),
    new Tile(3, 1, 1, s, cougar),
    new Tile(3, 1, 2, f),
    new Tile(3, 1, 3, m),
    new Tile(3, 1, 4, w),
    new Tile(3, 1, 5, w),

    new Tile(3, 2, 0, m, cougar),
    new Tile(3, 2, 1, m),
    new Tile(3, 2, 2, m),
    new Tile(3, 2, 3, m),
    new Tile(3, 2, 4, w),
    new Tile(3, 2, 5, w)
];

tile_map[4] = [
    new Tile(4, 0, 0, d),
    new Tile(4, 0, 1, d),
    new Tile(4, 0, 2, m),
    new Tile(4, 0, 3, m),
    new Tile(4, 0, 4, m),
    new Tile(4, 0, 5, m),

    new Tile(4, 1, 0, d),
    new Tile(4, 1, 1, d),
    new Tile(4, 1, 2, m),
    new Tile(4, 1, 3, w),
    new Tile(4, 1, 4, w),
    new Tile(4, 1, 5, w, cougar),

    new Tile(4, 2, 0, d),
    new Tile(4, 2, 1, d),
    new Tile(4, 2, 2, d),
    new Tile(4, 2, 3, f),
    new Tile(4, 2, 4, f),
    new Tile(4, 2, 5, f, cougar)
];

tile_map[5] = [
    new Tile(5, 0, 0, s),
    new Tile(5, 0, 1, s),
    new Tile(5, 0, 2, s),
    new Tile(5, 0, 3, m),
    new Tile(5, 0, 4, m),
    new Tile(5, 0, 5, m),

    new Tile(5, 1, 0, s),
    new Tile(5, 1, 1, d),
    new Tile(5, 1, 2, d),
    new Tile(5, 1, 3, w),
    new Tile(5, 1, 4, m),
    new Tile(5, 1, 5, m, bear),

    new Tile(5, 2, 0, d),
    new Tile(5, 2, 1, d),
    new Tile(5, 2, 2, w),
    new Tile(5, 2, 3, w),
    new Tile(5, 2, 4, w, bear),
    new Tile(5, 2, 5, w, bear)
];

tile_map[6] = [
    new Tile(6, 0, 0, d, bear),
    new Tile(6, 0, 1, d),
    new Tile(6, 0, 2, s),
    new Tile(6, 0, 3, s),
    new Tile(6, 0, 4, s),
    new Tile(6, 0, 5, f),

    new Tile(6, 1, 0, m, bear),
    new Tile(6, 1, 1, m),
    new Tile(6, 1, 2, s),
    new Tile(6, 1, 3, s),
    new Tile(6, 1, 4, f),
    new Tile(6, 1, 5, f),

    new Tile(6, 2, 0, m),
    new Tile(6, 2, 1, w),
    new Tile(6, 2, 2, w),
    new Tile(6, 2, 3, w),
    new Tile(6, 2, 4, w),
    new Tile(6, 2, 5, f)
];

/*

The below code is used to generate the tile_map for the second half of the board using the first half of the board and flipping each one.

const number_of_tiles_per_row = 6;
const number_of_tiles_per_col = 3;
const number_of_unique_tiles = 6;
for (let i = 0; i < number_of_unique_tiles; i++) {
    let index = (i + number_of_unique_tiles + 1).toString(16).toUpperCase();
    let reversedArray = tile_map[i + 1].slice().reverse();
    console.log(`tile_map[${index}] = [`);

    reversedArray.forEach((tile, j) => {
        const new_row = ((number_of_tiles_per_col - 1) - tile.row);
        const new_col = ((number_of_tiles_per_row - 1) - tile.col);
        let output = `   new Tile(${index}, ${new_row}, ${new_col}, '${tile.type[0]}'`;
        if (tile.animal_territory) {
            output += `, ${tile.animal_territory}`;
        }
        output += `)`;
        if (j < reversedArray.length - 1) {
            output += ',';
        }

        if (j > 0 && reversedArray[j].col > reversedArray[j - 1].col) {
            console.log();
        }

        console.log(output);
    });

    console.log(`];\n`);
}
*/

tile_map[7] = [
    new Tile(7, 0, 0, 'f', bear),
    new Tile(7, 0, 1, 'd', bear),
    new Tile(7, 0, 2, 'd', bear),
    new Tile(7, 0, 3, 'd'),
    new Tile(7, 0, 4, 's'),
    new Tile(7, 0, 5, 's'),
 
    new Tile(7, 1, 0, 'f'),
    new Tile(7, 1, 1, 'f'),
    new Tile(7, 1, 2, 'd'),
    new Tile(7, 1, 3, 'w'),
    new Tile(7, 1, 4, 's'),
    new Tile(7, 1, 5, 's'),
 
    new Tile(7, 2, 0, 'f'),
    new Tile(7, 2, 1, 'f'),
    new Tile(7, 2, 2, 'w'),
    new Tile(7, 2, 3, 'w'),
    new Tile(7, 2, 4, 'w'),
    new Tile(7, 2, 5, 'w')
 ];
 
 tile_map[8] = [
    new Tile(8, 0, 0, 'd'),
    new Tile(8, 0, 1, 'm'),
    new Tile(8, 0, 2, 'm'),
    new Tile(8, 0, 3, 'm'),
    new Tile(8, 0, 4, 'm'),
    new Tile(8, 0, 5, 's'),
 
    new Tile(8, 1, 0, 'd'),
    new Tile(8, 1, 1, 'd'),
    new Tile(8, 1, 2, 'd'),
    new Tile(8, 1, 3, 'f'),
    new Tile(8, 1, 4, 's'),
    new Tile(8, 1, 5, 's'),
 
    new Tile(8, 2, 0, 'f'),
    new Tile(8, 2, 1, 'f'),
    new Tile(8, 2, 2, 'f'),
    new Tile(8, 2, 3, 'f', cougar),
    new Tile(8, 2, 4, 'f', cougar),
    new Tile(8, 2, 5, 's', cougar)
 ];
 
 tile_map[9] = [
    new Tile(9, 0, 0, 'w'),
    new Tile(9, 0, 1, 'w'),
    new Tile(9, 0, 2, 'm'),
    new Tile(9, 0, 3, 'm'),
    new Tile(9, 0, 4, 'm'),
    new Tile(9, 0, 5, 'm', cougar),
 
    new Tile(9, 1, 0, 'w'),
    new Tile(9, 1, 1, 'w'),
    new Tile(9, 1, 2, 'm'),
    new Tile(9, 1, 3, 'f'),
    new Tile(9, 1, 4, 's', cougar),
    new Tile(9, 1, 5, 's', cougar),
 
    new Tile(9, 2, 0, 'w'),
    new Tile(9, 2, 1, 'f'),
    new Tile(9, 2, 2, 'f'),
    new Tile(9, 2, 3, 'f'),
    new Tile(9, 2, 4, 's'),
    new Tile(9, 2, 5, 's')
 ];
 
 tile_map[A] = [
    new Tile(A, 0, 0, 'f', cougar),
    new Tile(A, 0, 1, 'f'),
    new Tile(A, 0, 2, 'f'),
    new Tile(A, 0, 3, 'd'),
    new Tile(A, 0, 4, 'd'),
    new Tile(A, 0, 5, 'd'),
 
    new Tile(A, 1, 0, 'w', cougar),
    new Tile(A, 1, 1, 'w'),
    new Tile(A, 1, 2, 'w'),
    new Tile(A, 1, 3, 'm'),
    new Tile(A, 1, 4, 'd'),
    new Tile(A, 1, 5, 'd'),
 
    new Tile(A, 2, 0, 'm'),
    new Tile(A, 2, 1, 'm'),
    new Tile(A, 2, 2, 'm'),
    new Tile(A, 2, 3, 'm'),
    new Tile(A, 2, 4, 'd'),
    new Tile(A, 2, 5, 'd')
 ];
 
 tile_map[B] = [
    new Tile(B, 0, 0, 'w', bear),
    new Tile(B, 0, 1, 'w', bear),
    new Tile(B, 0, 2, 'w'),
    new Tile(B, 0, 3, 'w'),
    new Tile(B, 0, 4, 'd'),
    new Tile(B, 0, 5, 'd'),
 
    new Tile(B, 1, 0, 'm', bear),
    new Tile(B, 1, 1, 'm'),
    new Tile(B, 1, 2, 'w'),
    new Tile(B, 1, 3, 'd'),
    new Tile(B, 1, 4, 'd'),
    new Tile(B, 1, 5, 's'),
 
    new Tile(B, 2, 0, 'm'),
    new Tile(B, 2, 1, 'm'),
    new Tile(B, 2, 2, 'm'),
    new Tile(B, 2, 3, 's'),
    new Tile(B, 2, 4, 's'),
    new Tile(B, 2, 5, 's')
 ];
 
 tile_map[C] = [
    new Tile(C, 0, 0, 'f'),
    new Tile(C, 0, 1, 'w'),
    new Tile(C, 0, 2, 'w'),
    new Tile(C, 0, 3, 'w'),
    new Tile(C, 0, 4, 'w'),
    new Tile(C, 0, 5, 'm'),
 
    new Tile(C, 1, 0, 'f'),
    new Tile(C, 1, 1, 'f'),
    new Tile(C, 1, 2, 's'),
    new Tile(C, 1, 3, 's'),
    new Tile(C, 1, 4, 'm'),
    new Tile(C, 1, 5, 'm', bear),
 
    new Tile(C, 2, 0, 'f'),
    new Tile(C, 2, 1, 's'),
    new Tile(C, 2, 2, 's'),
    new Tile(C, 2, 3, 's'),
    new Tile(C, 2, 4, 'd'),
    new Tile(C, 2, 5, 'd', bear)
 ];

export { tile_map };