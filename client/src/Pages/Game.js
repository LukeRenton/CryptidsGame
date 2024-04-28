import React, { useEffect, useState } from 'react'
import { getMap } from '../Services/MapService'
import { tile_map } from '../Models/BoardConstants'
import Tile from '../Models/Tile';
import Board from '../Components/Board';

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [tiles, setTiles] = useState({});
  const [pieces, setPieces] = useState({});

    const getNewMap = async () => {
        const newMap = await getMap('intro',4);
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
    <div>
        {loading ? 'loading' : 
            <div>
                <Board tiles={tiles} pieces={pieces}></Board>
            </div>
        }
    </div>
  )
}
