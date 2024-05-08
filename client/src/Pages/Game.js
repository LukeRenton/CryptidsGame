import React, { useEffect, useState } from 'react'
import { getMap } from '../Services/MapService'
import { tile_map } from '../Models/BoardConstants'
import Tile from '../Models/Tile';
import Board from '../Components/Board';
import '../Styles/Game.css';
import BoardInfo from '../Components/BoardInfo';
import Cylinder from '../Components/Cylinder';

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
      
      console.log(newMap)
      return newMap;
  }

  useEffect(async () => {
    const newMap = await getNewMap();
  },[])

  return (
    <div className='game-root'>
       {loading ? 'loading' : 
           <>
              <div className='game-board-info'>
                <BoardInfo  setRevealCryptid={setRevealCryptid}
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
              </div>
              <div className='game-board-container'>
                  <div className='game-board-root'>
                    <Board  
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
