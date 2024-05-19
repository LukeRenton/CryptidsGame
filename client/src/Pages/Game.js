import React, { useEffect, useState } from 'react'
import { getMap } from '../Services/MapService'
import { tile_map } from '../Models/BoardConstants'
import Tile from '../Models/Tile';
import Board from '../Components/Board';
import '../Styles/Game.css';
import BoardInfo from '../Components/BoardInfo';
import Cylinder from '../Components/Cylinder';
import Moves from '../Components/Moves';

export default function Game( props ) {
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
            
            grid[globalRow][globalCol] = {row: globalRow, col: globalCol, pieces: [], animalTerritory: hex.animal_territory};

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

      const allTiles = {};
      for (let i = 1; i <= 6; i++) {
          const tile = tile_map[newMap.board.tiles[i].tile_num]
          allTiles[i] = tile;
      }
      setTiles(allTiles);
      
      const allPieces = newMap.board.pieces;
      setPieces(allPieces);
      
      console.log(allTiles);

      const grid = parseInfo(newMap, allTiles, allPieces);
      
      return newMap;
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
