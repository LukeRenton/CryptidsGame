/*
TILE.JS
Type: component
Description: Provides Tile model used for the board
*/

class Tile {
    constructor(tile_number, row, col, type, animal_territory = null, playing_piece = null) {
      // Constructor to initialize properties of a tile object
      this._tile_number = tile_number;
      this._row = row;
      this._col = col;
      this._type = type;
      this._animal_territory = animal_territory;
      this._playing_piece = playing_piece;
    }
  
    // Method to generate the filename for the tile's image  
    get_tile_image() {
      return `${this._tile_number}_${this._row}_${this._col}.png`;
    }
    
    // Setter method for setting the playing piece on the tile
    set playing_piece(piece) {
      this._playing_piece = piece;
    }
    
    // Setter method for setting the animal territory associated with the tile
    set animal_territory(territory) {
      this._animal_territory = territory;
    }
  
    // Getter method to access the tile number  
    get tile_number() {
      return this._tile_number;
    }
  
    // Getter method to access the row position of the tile  
    get row() {
      return this._row;
    }
  
    // Getter method to access the column position of the tile
    get col() {
      return this._col;
    }
  
    // Getter method to access the type of the tile  
    get type() {
      return this._type;
    }
  
    // Getter method to access the playing piece on the tile
    get playing_piece() {
      return this._playing_piece;
    }
  
    // Getter method to access the animal territory associated with the tile  
    get animal_territory() {
      return this._animal_territory;
    }
  
    // Public method to get the tile image filename  
    get tile_image() {
      return this.get_tile_image();
    }
  }

export default Tile;