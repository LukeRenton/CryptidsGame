import React, { useEffect, useState } from 'react'
import { getMap } from '../Services/MapService'
import { tile_map } from '../Models/BoardConstants'
import Tile from '../Models/Tile';
import Board from '../Components/Board';
import '../Styles/Game.css';
import BoardInfo from '../Components/BoardInfo';
import Cylinder from '../Components/Cylinder';
import Moves from '../Components/Moves';


// Define and export the Game functional component
export default function Game( props ) {
  // State variables initialization
  const [gameState, setGameState] = useState( {
                                                playerTurn: 1,
                                                positivePieces: [],
                                                negativePieces: [],
                                                searchPiece: null
                                              });

  const [hexHover, setHexHover] = useState(null);

  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [tiles, setTiles] = useState({});
  const [pieces, setPieces] = useState({});

  const [placeNegative, setPlaceNegative] = useState(false);
  const [placePositive, setPlacePositive] = useState(false);
  const [placeSearch, setPlaceSearch] = useState(false);

  const [revealCryptid, setRevealCryptid] = useState(false);

  const [playerNames, setPlayerNames] = useState(["","","","",""]);

  const [turn, setTurn] = useState(1);       
  
  const [allAvailableGuesses, setAllAvailableGuesses] = useState({});
  const [showAvailableGueses, setShowAvailableGuesses] = useState(false);

  const handlePlaceNegative = (value) => {
    setPlacePositive(false);
    setPlaceSearch(false);
    setPlaceNegative(value);
  }

  const handlePlacePositive = (value) => {
    setPlaceNegative(false);
    setPlaceSearch(false);
    setPlacePositive(value);
  }

  const handlePlaceSearch = (value) => {
    setPlaceNegative(false);
    setPlacePositive(false);
    setPlaceSearch(value);
  }

  // Function: parseInfo
  // -- Parse the information of the map, tiles and pieces to analyse valid blocks for the user(s)
  // -- Output is in the form:
    /*
        {
            grid: [0 0][0 1][0 2] ... [0 11]
                  [1 0][1 1][1 2] ... [1 11]
                  ...   ...  ...  ...  ...
                  [8 0][8 1][8 2] ... [8 11] where each element in the grid is an object composed of: { row, col, pieces, animalTerritory }
            clues: [cluePlayer1, cluePlayer2, cluePlayer3, cluePlayer4, cluePlayer5]
            hint: hint
        }    
    */
  const parseInfo = async (map, allTiles, allPieces) => {
    const clues = map.rules;
    const hint = map.hint;
    const numTiles = 6;
    const totalRows = 9;
    const totalCols = 11;
    const totalHexesPerMap = 18;

    const grid = Array(totalRows).fill(0);
    
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array(totalCols).fill(0);
    }

    for (let tile = 1; tile <= numTiles; tile++) {
        const map = allTiles[tile];
        for (let j = 0; j < totalHexesPerMap; j++) {
            const hex = await map[j];
            const row = await hex.row;
            const col = await hex.col;

            const globalCol = ((tile+1) % 2 )*6 + col;
            const globalRow = (Math.floor((tile-1) / 2))*3 + row;
            
            grid[globalRow][globalCol] = {row: globalRow, col: globalCol, type : hex.type, pieces: [], animalTerritory: hex.animal_territory};

            if (allPieces.white_standing_stone.globalRow === globalRow && allPieces.white_standing_stone.globalCol === globalCol) {
                grid[globalRow][globalCol].pieces.push('white_standing_stone');
            }
            if (allPieces.green_standing_stone.globalRow === globalRow && allPieces.green_standing_stone.globalCol === globalCol) {
                grid[globalRow][globalCol].pieces.push('green_standing_stone');
            }
            if (allPieces.blue_standing_stone.globalRow === globalRow && allPieces.blue_standing_stone.globalCol === globalCol) {
                grid[globalRow][globalCol].pieces.push('blue_standing_stone');
            }
            if (allPieces.white_shack.globalRow === globalRow && allPieces.white_shack.globalCol === globalCol) {
                grid[globalRow][globalCol].pieces.push('white_shack');
            }
            if (allPieces.green_shack.globalRow === globalRow && allPieces.green_shack.globalCol === globalCol) {
                grid[globalRow][globalCol].pieces.push('green_shack');
            }
            if (allPieces.blue_shack.globalRow === globalRow && allPieces.blue_shack.globalCol === globalCol) {
                grid[globalRow][globalCol].pieces.push('blue_shack');
            }
        }
    }
    return {grid: grid, clues: clues, hint: hint};
  }

  const getNewMap = async () => {
      const newMap = await getMap(props.localGameInfo.mode,props.localGameInfo.players);
    
      setMap(newMap);
      setLoading(false);

      // Extract tiles from the new map
      const allTiles = {};
      for (let i = 1; i <= 6; i++) {
          const tile = tile_map[newMap.board.tiles[i].tile_num]
          allTiles[i] = tile;
      }
      setTiles(allTiles);
      
      // Set pieces from the new map
      const allPieces = newMap.board.pieces;
      setPieces(allPieces);
      

      const grid = await parseInfo(newMap, allTiles, allPieces);
      console.log(grid);
      const availableGuesses = getAvailableGuesses(grid);
      setAllAvailableGuesses(availableGuesses);
      return newMap;
  }

  const processHexNumbers = (availableGuesses) => {
    for (let player = 1; player <= props.localGameInfo.players; player++) {
      const newAvailableGuesses = availableGuesses[player];
      for (let i = 0; i < newAvailableGuesses.length; i++) {
        const tile = newAvailableGuesses[i];
        const row = tile.row;
        const col = tile.col;
        
        // Retrieve which tile number we are on
        const tile_row = Math.floor(row/3);
        const tile_col = Math.floor(col/6);
        const tile_num = tile_row*2 + tile_col + 1
        
        const actual_row = row % 3;
        const actual_col = col % 6;
        
        newAvailableGuesses[i].row = actual_row;
        newAvailableGuesses[i].col = actual_col;
        newAvailableGuesses[i].tileNumByPosition = tile_num;
      }
      availableGuesses[player] = newAvailableGuesses;
    }
    return availableGuesses;
  }

  const getAvailableGuesses = (boardState) => {  
    const { grid, clues, hint } = boardState;
    const availableGuesses = {};
    console.log(grid);
    for (let i = 0; i < clues.length; i++) {
        // Need to remove "The habitat is" from the clue to get the actual clue
        let clue = (clues[i]).substring(15);
        const player = i+1;
        const allowedTiles = processClue(clue, grid);
        availableGuesses[player] = allowedTiles;
    }
    return processHexNumbers(availableGuesses);
  }


  const processClue = (clue, grid) => {
    if (clue.startsWith("on")) {
      console.log("Processing on: ", clue)
      return onTypeClue(clue, grid);
    } else if (clue.startsWith("not on")) {
      return notOnTypeClue(clue, grid);
    } else if (clue.startsWith("within one space")) {
      console.log("Processing within one space: ", clue)
      return withinOneSpaceClue(clue, grid);
    } else if (clue.startsWith("within two spaces")) {
      console.log("Processing within two spaces: ", clue)
      return withinTwoSpaceClue(clue, grid);
    } else if (clue.startsWith("within three spaces")) {
      console.log("Processing within three spaces: ", clue)
      return withinThreeSpaceClue(clue, grid);
    // } else if (clue.startsWith("not within one space")) {
    //   return notWithinOneSpaceClue(clue, grid);
    // } else if (clue.startsWith("not within two spaces")) {
    //   return notWithinTwoSpaceClue(clue, grid);
    // } else if (clue.startsWith("not within three spaces")) {
    //   return notWithinThreeSpaceClue(clue, grid);
    } else {
      console.log("Unknown clue type:", clue);
    }
  };

 const onTypeClue = (clue, grid) => {
    const allowedTiles = [];
    const splitClue = clue.split(' ');
    const type1 = splitClue[1];
    const type2 = splitClue[3];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const hex = grid[row][col];
            if (hex.type === type1 || hex.type === type2) {
                allowedTiles.push(hex);
            }
        }
    }
    return allowedTiles;
  }

  const notOnTypeClue = (clue, grid) => {
    const allowedTiles = [];
    const splitClue = clue.split(' ');
    const type1 = splitClue[2];
    const type2 = splitClue[4];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const hex = grid[row][col];
            if (hex.type !== type1 && hex.type !== type2) {
                allowedTiles.push(hex);
            }
        }
    }
    return allowedTiles;
  }

  const withinOneSpaceClue = (clue, grid) => {
    let allowedTiles = [];
    const splitClue = clue.split(' ');
    const type = splitClue[splitClue.length - 1];
    const depth = 1;
    const territory = type === "territory";
    //We only want unique tiles
    const allowedTilesSet = new Set();

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const hex = grid[row][col];
            if ((territory && hex.animalTerritory !== null) || (!territory && hex.type === type)) {
                allowedTilesSet.add(hex);
                const neighbours = generateNeighbours(row, col, depth, grid);
                neighbours.forEach(neighbour => allowedTilesSet.add(neighbour));
            }
        }
    }

    // Convert the Set back to an array
    allowedTiles = Array.from(allowedTilesSet);
    return allowedTiles;
  };

  const withinTwoSpaceClue = (clue, grid) => {
    let allowedTiles = [];
    const splitClue = clue.split(' ');
    const lengthOfClue = splitClue.length;
    let type = splitClue[lengthOfClue - 2];
    const depth = 2;
    const territory = (type === "cougar" || type === "bear");
    if (!territory) {
      // The "a" means the clue is: "is within two spaces of a shack" else the clue is "is within two spaces of a standing stone"
      if (type === "a") {
        type = "shack";
      } 
      else {
        type = "standing stone"
      }
        
    }
    console.log("Type: ", type)
    //We only want unique tiles
    const allowedTilesSet = new Set();

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
          const hex = grid[row][col];
          if ((territory && hex.animalTerritory === type) || (!territory && hex.pieces.length > 0 && standardiseName(hex.pieces[0]) === type)) {
              allowedTilesSet.add(hex);
              const neighbours = generateNeighbours(row, col, depth, grid);
              neighbours.forEach(neighbour => allowedTilesSet.add(neighbour));
          }
      }
    }

    // Convert the Set back to an array
    allowedTiles = Array.from(allowedTilesSet);
    console.log("Allowed Tiles: ", allowedTiles)
    return allowedTiles;
  }

  const withinThreeSpaceClue = (clue, grid) => {
    let allowedTiles = [];
    const splitClue = clue.split(' ');
    const color = splitClue[splitClue.length - 2];
    const depth = 3;

    //We only want unique tiles
    const allowedTilesSet = new Set();
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
          const hex = grid[row][col];
          if (hex.pieces.length > 0 && getPieceColor(hex.pieces[0]) === color){
              allowedTilesSet.add(hex);
              const neighbours = generateNeighbours(row, col, depth, grid);
              neighbours.forEach(neighbour => allowedTilesSet.add(neighbour));
          }
      }
    }

    // Convert the Set back to an array
    allowedTiles = Array.from(allowedTilesSet);
    console.log("Allowed Tiles: ", allowedTiles)
    return allowedTiles;
  }


  const generateNeighbours = (row, col, depth, grid) => {
    const neighbours = [];
    for (let i = -depth; i <= depth; i++) {
        for (let j = -depth; j <= depth; j++) {
            if (i === 0 && j === 0) {
                continue;
            }

            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[newRow].length) {
                neighbours.push(grid[newRow][newCol]);
            }
        }
    }
    return neighbours;
  }


  //Since the code uses underscore convention, to check the type of tile I standardise it here
  const standardiseName = (name) => {
    const splitName = name.split('_');
    if (splitName.length === 2){
      return "shack";
    }
    else{
      return "standing stone";
    }
  }

  const getPieceColor = (name) => {
    const splitName = name.split('_');
    return splitName[0];
  }

  useEffect(async () => {
    const newMap = await getNewMap();
  },[])
//   useEffect(() => {
    // const newMap = getNewMap();  
//   },[])


  return (
    <div className='game-root'>
       {loading ? 'loading' : 
           <>
              <div className='game-board-info'>
                {!revealCryptid ?
                <BoardInfo  
                    showAvailableGueses={showAvailableGueses}
                    setShowAvailableGuesses={setShowAvailableGuesses}
                    turn={turn}
                    setTurn={setTurn}
                    numPlayers={props.localGameInfo.players}
                    playerNames={props.playerNames}
                    setRevealCryptid={setRevealCryptid}
                    placeSearch={placeSearch}
                    setPlaceSearch={handlePlaceSearch}
                    placePositive={placePositive}
                    setPlacePositive={handlePlacePositive} 
                    placeNegative={placeNegative}
                    setPlaceNegative={handlePlaceNegative} 
                    gameState={gameState}
                    setGameState={setGameState}
                    clues={map.rules}
                    hint={map.hint}
                    hexHover={hexHover}>
                </BoardInfo>
                :
                <Moves
                    numPlayers={props.localGameInfo.players}
                    playerNames={props.playerNames}
                    movesList={props.movesList}>
                    playerNames={playerNames}
                </Moves>
                }
              </div>
              <div className='game-board-container'>
                  <div className='game-board-root'>
                    <Board  
                            showAvailableGueses={showAvailableGueses}
                            allAvailableGuesses={allAvailableGuesses}
                            turn={turn}
                            setTurn={setTurn}
                            movesList={props.movesList}
                            setMovesList={props.setMovesList}
                            revealCryptid={revealCryptid}
                            placeSearch={placeSearch}
                            setPlaceSearch={handlePlaceSearch}
                            placePositive={placePositive}
                            setPlacePositive={handlePlacePositive}
                            placeNegative={placeNegative}
                            setPlaceNegative={handlePlaceNegative}
                            gameState={gameState}
                            setGameState={setGameState}
                            setHexHover={setHexHover}
                            clues={map.rules}
                            hint={map.hint}
                            tiles={tiles}
                            pieces={pieces}
                            destination={map.destination}
                            >
                    </Board>
                  </div>
              </div>

            </>
        }
      
      </div>
  )
}
