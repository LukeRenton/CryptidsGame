/*
TUTORIAL.JS
Type: page
Description: Renders the tutorial page
*/

import React from 'react'
import logo from '../Images/Tutorial/logo.png';
import map from '../Images/Tutorial/map.png';
import animal from '../Images/Tutorial/animal.png';
import pieces from '../Images/Tutorial/pieces.png';
import one from '../Images/Tutorial/one.png';
import two from '../Images/Tutorial/two.png';
import three from '../Images/Tutorial/three.png';
import four from '../Images/Tutorial/four.png';
import five from '../Images/Tutorial/five.png';
import six from '../Images/Tutorial/six.png';
import structures from '../Images/Tutorial/structures.png';
import '../Styles/Tutorial.css'
import { useNavigate } from 'react-router-dom';
import PlantButton from '../Components/PlantButton';

// Functional component for the Tutorial page
export default function Tutorial() {
    const navigate = useNavigate();
    
  // Return the JSX elements for the Tutorial component  
  return (
    <div className='tutorial-root'>
        <div className="tutorial-image-container">
            <img src={logo} alt="Cryptid" className="tutorial-cryptid-image" />
        </div>
        <h1>OBJECTIVE</h1>
        
        <p>In Cryptid, the primary goal is to outpace your opponents and correctly pinpoint the elusive Cryptid's habitat before everyone else. 
        Every participant in the game will receive a distinct hint, which is a vital piece of information about the creature’s dwelling place. 
        When these hints are put together, they pinpoint a specific location on the map - the creature’s habitat. The hint given to each player either indicates a region where the creature resides or a region where it does not, depending on the landscape and structures present on the game board. 
        Throughout the game, players will interrogate each other in an attempt to deduce the hints of others. The first player who accurately applies all the hints to locate the habitat is declared the winner of the game.</p>

        <h1>COMPONENTS</h1>
        <h2>THE MAP</h2>
        <p>The map is the central element of the game, where all the searching activities will occur. 
        It is composed of six map tiles, each marked with a number and divided into hexagonal sections. 
        These sections represent five different types of terrains: desert, forest, water, mountain, and swamp. 
        A number is displayed on one corner of each tile, which is utilized during the game setup.</p>
        <img src={map} alt="Map" className="tutorial-transition"/>
        <h2>ANIMAL TERRITORY</h2>
        <p>Besides the terrain type, a space on the map might also be designated as the territory of a bear or a cougar. 
        This is indicated by the specific outline around the space.</p>
        <img src={animal} alt="Animal Territory" className="tutorial-transition" />

        <h2>STRUCTURES</h2>
        <p>In addition to the terrain and possible animal territories, each space on the map might also feature a structure. 
        There are two kinds of structures that can be found: standing stones and abandoned shacks. 
        Each of these structure types is available in four different colours: white, green, blue, and black. 
        This adds another layer of complexity and strategy to the game.</p>
        <img src={structures} alt="Structures" className="tutorial-transition" />

        <h2>PLAYING PIECES</h2>
        <p>Each player possesses a unique set of cubes and discs, which are placed on the board when they need to share information with other players. 
        A cube placed on a space signifies that, according to the player’s clue, the creature cannot inhabit that space. 
        Each space can only contain one cube. On the other hand, a disc indicates that the creature could potentially inhabit that space, as per the player’s clue. 
        Multiple discs can be stacked on a single space. 
        Once placed, pieces are not removed from the board unless an error has been made.</p>
        <img src={pieces} alt="Playing Pieces" className="tutorial-transition" />
        
        <h1>GAMEPLAY</h1>
        <p>	Upon starting the game you will be presented with a fully setup board. Once everything is set up and clues have been allocated. 
        The objective of the game is to accurately determine the single space on the board that could be the cryptid’s habitat. 
        The game begins with an initial sharing phase: the first player must place a cube on a space that, according to their clue, cannot be the habitat. 
        The next player will then do the same, and this continues until all players have placed two cubes. Players are permitted to place their pieces on a space that contains a structure, but they cannot place a piece on a space that already contains another player’s cube.
        After the initial sharing phase, the first player takes their turn.
        During a player’s turn, they can either ask another player a question or search a space. The turn then passes to the player, unless the current player has correctly identified the habitat.
        As the game progresses, players will place cubes or discs of their colour on various spaces on the board. A cube indicates that the space cannot be the habitat according to that player’s clue, while a disc indicates that the space could be the habitat according to their clue.
        The game is won by the player who successfully searches the space that contains the habitat.</p>

        <h2>CORE PRINCIPLES</h2>
        <p>Regardless of whether you choose to question or search, you must adhere to these fundamental rules of the game:</p>
        <ul>
            <li>You must be truthful when placing your pieces on the map.</li>
            <li>Once placed, pieces are never removed from the board.</li>
            <li>You cannot interact with a space that already contains any cube. This means you cannot question, search, or place any of your pieces on that space.</li>
            <li>If you cause another player to place a cube on their turn, you must also place one of your cubes somewhere on the board. This rule applies whether you asked a question or conducted a search.</li>
            <li>If one of your pieces is already on a space, you cannot add another piece to that space.</li>
        </ul>
        <p>At times, you may be compelled to share information about your clue with other players. When this occurs, you must be honest in your responses. 
        However, it’s often possible to respond in a way that either misleads the other player or reveals as little information as possible. 
        For instance, if one of your cubes is already on a mountain space, you might place another one of your cubes on a different mountain space to lead other players to believe that your clue is ‘the habitat is not in the mountains’.
            This strategic play adds an element of intrigue and deception to the game.</p>

        <h2>QUESTIONING</h2>
        <p>To initiate a question, position the pawn on a space on the map and ask another player, ‘Could the creature be here?’ You have the freedom to question any space, even those you are certain could not be the creature’s habitat.
            In fact, this can often be a strategic move to mislead others about your own clue!
        The player you questioned must then determine whether the selected space could be the creature’s habitat based on their clue. They will place either a disc or a cube of their colour on the chosen space to indicate the possibility of the creature’s presence there.
        If they placed a cube, indicating the creature cannot be there, you are then required to place a cube on a different space that cannot be the creature’s habitat according to your clue. After this, the turn passes to the next player. 
        This process ensures a fair and strategic gameplay experience.
        </p>

        <h2>SEARCHING</h2>
        <p>To conduct a search, position a pawn on a space on the map that could potentially be the habitat according to your clue and announce a search. You must promptly place one of your own discs on that space. If one of your discs is already on that space, you are required to place a disc on a different space that could be the habitat according to your clue and does not already contain one of your discs.
        Next, ask each player if the creature could be in that space according to their clue. They must place a cube or a disc on the space to indicate their answer, unless one of their discs is already on the space, in which case they pass their turn to the next player.
        The moment a player places a cube, everyone must stop. No further declarations are made, and you are now required to place a cube on a different space that cannot be the habitat according to your clue. The turn then passes to the next player.
        If no player places a cube, congratulations! You have correctly identified the habitat and won the game! Take a moment to enjoy the praise from the other players before comparing clues. This is the essence of the game, combining strategy, deduction, and a bit of luck to emerge victorious.
        </p>
        
        <h2>CLUES</h2>
        <p>There are various types of clues in the game, but they all relate to distance from certain elements on the board. Some clues indicate that the habitat must be located on a specific type of terrain, while others suggest that the habitat is within a certain number of spaces from a type of terrain, structure, or animal territory.
        It’s important to note that any element on the board is considered zero spaces away from itself. This implies that if a clue specifies that the habitat is within a certain distance of an element, the space that the element occupies is included. For instance, if your clue is ‘within one space of a forest’, it encompasses every forest space and every space adjacent to a forest space.
        One key rule is that players will never receive identical clues in any game. This ensures a unique and challenging experience each time you play. If players are badly stuck, it’s possible to get a hint. This must be agreed by all players.
        </p>
        <h1>POSSIBLE CLUES</h1>
        <h3>1.THE HABITAT IS ON ONE OF TWO TYPES OF TERRAIN.</h3>
        <p>Example: ‘The habitat is on forest or swamp.’ This player knows the habitat is on a forest space or a swamp space, so would place discs on those spaces. 
        The player knows the habitat cannot be on any other terrain type, so would place cubes on spaces with any other terrain type.</p>
        <img src={one} alt="Clue 1" className="tutorial-transition" />

        <h3>2.THE HABITAT IS WITHIN ONE SPACE OF A TYPE OF TERRAIN</h3>
        <p>The habitat is within one space of the specified terrain type. This includes tiles of the specified terrain type. Example: ‘The habitat is within one space of desert.’ The desert spaces are all within one space of themselves, so they could be the habitat.
            A cube would be placed on any space which is more than one space away from a desert space.</p>
            <img src={two} alt="Clue 2" className="tutorial-transition" />

        <h3>3.THE HABITAT IS WITHIN ONE SPACE OF EITHER ANIMAL TERRITORY.</h3>
        <p>The habitat is within one space of either animal territory. This includes spaces inside those territories.
            Example: ‘The habitat is within one space of either animal territory.’ The spaces within one space of bear or cougar territories could be the habitat, so the player would place discs on them. 
            Any spaces more than one space from an animal territory could not be the habitat, so would be marked with cubes.</p> 
            <img src={three} alt="Clue 3" className="tutorial-transition" />

        <h3>4.THE HABITAT IS WITHIN TWO SPACES OF A TYPE OF STRUCTURE.</h3>
        <p>The habitat is within two spaces of the specified type of structure (standing stone or abandoned shack). This includes the space containing the structure. 
        The colour of the structure is irrelevant for this clue. Example: ‘The habitat is within two spaces of a standing stone.</p> 
        <img src={four} alt="Clue 4" className="tutorial-transition" />

        <h3>5.THE HABITAT IS WITHIN TWO SPACES OF A TYPE OF ANIMAL TERRITORY</h3>
        <p>The habitat is within two spaces of an animal territory of the specified type (either bear or cougar). 
        This includes spaces containing the specified type of animal territory. For this clue, only the specified type counts. 
        Example: ‘The habitat is not within two spaces of bear territory.’ This clue says where the habitat cannot be. It cannot be any space which is within two spaces of any bear territory, which would all be marked with cubes. 
        It can be any space which is not within two spaces of bear territory, which would be marked with discs.</p> 
        <img src={five} alt="Clue 5" className="tutorial-transition" />

        <h3>6.THE HABITAT IS WITHIN THREE SPACES OF A COLOUR OF STRUCTURE</h3>
        <p>The habitat is within three spaces of the specified colour of structure. This clue includes spaces containing the specified colour of structure. The type of structure is irrelevant for this clue. 
        Example: ‘The habitat is within three spaces of a blue structure.’</p>
        <img src={six} alt="Clue 6" className="tutorial-transition" />   

        <h1>End of Game</h1>
        <p>The game comes to an end when a player correctly identifies the location of the Cryptid.</p>
        <PlantButton onClick={() => {navigate('/lobby')}}>Go to lobby</PlantButton>
    </div>
  )
}
