class Tile {
    constructor(tile_number, row, col, type, animal_territory = null, playing_piece = null) {
      this._tile_number = tile_number;
      this._row = row;
      this._col = col;
      this._type = type;
      this._animal_territory = animal_territory;
      this._playing_piece = playing_piece;
    }
  
    get_tile_image() {
      return `${this._tile_number}_${this._row}_${this._col}.png`;
    }
  
    set playing_piece(piece) {
      this._playing_piece = piece;
    }
  
    set animal_territory(territory) {
      this._animal_territory = territory;
    }
  
    get tile_number() {
      return this._tile_number;
    }
  
    get row() {
      return this._row;
    }
  
    get col() {
      return this._col;
    }
  
    get type() {
      return this._type;
    }
  
    get playing_piece() {
      return this._playing_piece;
    }
  
    get animal_territory() {
      return this._animal_territory;
    }
  
    get tile_image() {
      return this.get_tile_image();
    }
  }

export default Tile;