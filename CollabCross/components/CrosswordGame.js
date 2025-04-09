import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameHeader from './GameHeader';
import CrosswordGrid from './CrosswordGrid';
import CluesList from './CluesList';
import PlayerStats from './PlayerStats';
import ChatBox from './ChatBox';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  width: 250px;
  padding: 10px;
  background-color: #1f1f1f;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CenterPanel = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  padding: 0;
  justify-content: center;
  align-items: center;
`;

const RightPanel = styled.div`
  width: 350px;
  padding: 10px;
  background-color: #1f1f1f;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Mock data for crossword puzzle
const crosswordData = {
  grid: Array(15).fill().map(() => Array(15).fill({ value: '', isBlack: false })),
  clues: {
    across: [
      { number: 1, clue: "Messy pile", answer: "HEAP" },
      { number: 5, clue: "Limbs to do an arm lift tread", answer: "LEGS" },
      { number: 8, clue: "Odysseus' faithful dog", answer: "ARGOS" },
      { number: 13, clue: "Major or Minor in astronomy?", answer: "URSA" },
      { number: 14, clue: "____ pretzel brand", answer: "GOLD" },
      { number: 16, clue: "Braided tabs", answer: "AGLETS" },
      { number: 17, clue: "Lumberer or Lovecraftian, informally", answer: "LOGGER" },
      { number: 18, clue: "Buckner's home", answer: "BOSTON" },
      { number: 19, clue: "Japanese noodle dish", answer: "RAMEN" },
      { number: 20, clue: "Something you might step on before or after a shower", answer: "MAT" },
      { number: 23, clue: "What backup dancers often move in", answer: "SYNC" },
      { number: 24, clue: "Casual affirmative", answer: "YEAH" },
      { number: 25, clue: "Sleep cycle inits.", answer: "REM" },
      { number: 28, clue: "K-pop group with an \"army\" of followers", answer: "BTS" },
      { number: 29, clue: "The Air Force's F-16 or F-22, for example", answer: "JET" },
      { number: 31, clue: "\"In bar cocktail with a rhyming name", answer: "GIN" }
    ],
    down: [
      { number: 1, clue: "Commotion", answer: "HUBBUB" },
      { number: 2, clue: "_____ (fictional character wandering in search of adventure)", answer: "ERRANT" },
      { number: 3, clue: "\"The way things stand...\"", answer: "ASITIS" },
      { number: 4, clue: "Routes", answer: "PATHS" },
      { number: 5, clue: "Bing Crosby or Nat King Cole", answer: "SINGER" },
      { number: 6, clue: "Pacific salmon", answer: "COHO" },
      { number: 7, clue: "Like seaweed or raw octopus", answer: "SLIMY" },
      { number: 8, clue: "President Lincoln", answer: "ABE" },
      { number: 9, clue: "Not imaginary", answer: "REAL" },
      { number: 10, clue: "Cat in Duty Novels, e.g.", answer: "NAME" },
      { number: 11, clue: "Poem of praise", answer: "ODE" },
      { number: 12, clue: "Nine-digit ID", answer: "SSN" },
      { number: 15, clue: "Prescription specification", answer: "DOSE" },
      { number: 21, clue: "Color of two stripes on the flag of Canada", answer: "RED" },
      { number: 22, clue: "Attire for a DJ who doesn't want to be seen", answer: "MASK" },
      { number: 26, clue: "Lumen (pl)", answer: "LUMINA" },
      { number: 27, clue: "Go wide of the mark", answer: "MISS" }
    ]
  }
};

// Fill in some cells to make it look like a partially completed puzzle
const fillPuzzle = () => {
  const filledGrid = JSON.parse(JSON.stringify(crosswordData.grid));
  
  // Add black cells
  [0,4,8,12].forEach(row => {
    [0,4,8,12].forEach(col => {
      filledGrid[row][col].isBlack = true;
    });
  });
  
  // Add some pre-filled letters
  filledGrid[1][1].value = 'H';
  filledGrid[1][2].value = 'E';
  filledGrid[1][3].value = 'A';
  filledGrid[1][4].value = 'P';
  
  return filledGrid;
};

const CrosswordGame = ({ mode, onModeChange, onBackToHome }) => {
  const [grid, setGrid] = useState(() => fillPuzzle());
  const [currentPlayer, setCurrentPlayer] = useState('You');
  const [players, setPlayers] = useState([
    { id: 'player1', name: 'You', squaresFilled: 27, wordsSolved: 12, score: 45 },
    { id: 'player2', name: 'Dr_Dome', squaresFilled: 33, wordsSolved: 11, score: 23 }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'system', text: 'You and Dr_Dome are connected! Work together to solve the puzzle.' },
    { sender: 'Dr_Dome', text: 'Hi! Let\'s do this!' }
  ]);
  const [puzzleStats, setPuzzleStats] = useState({
    avgTime: '21:55',
    yourTime: '11:47',
    rating: '1100'
  });

  const handleCellClick = (row, col) => {
    if (grid[row][col].isBlack) return;
    
    // In a real app, you would update the cell value and sync with other users
    const newGrid = [...grid];
    newGrid[row][col].value = 'A'; // For demonstration, just fill with 'A'
    setGrid(newGrid);
  };

  const addChatMessage = (message) => {
    setChatMessages([...chatMessages, { sender: 'You', text: message }]);
    
    // Simulate response from other player
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'Dr_Dome', text: 'I think 3-Down is "ASITIS"!' }]);
    }, 1000);
  };

  return (
    <GameContainer>
      <GameHeader 
        mode={mode} 
        puzzleStats={puzzleStats}
        onModeChange={onModeChange}
        onBackToHome={onBackToHome}
      />
      
      <GameContent>
        <LeftPanel>
          <PlayerStats 
            players={players}
            currentPlayer={currentPlayer}
          />
          
          {mode === 'collaborative' && (
            <ChatBox 
              messages={chatMessages}
              onSendMessage={addChatMessage}
            />
          )}
        </LeftPanel>
        
        <CenterPanel>
          <CrosswordGrid 
            grid={grid} 
            onCellClick={handleCellClick} 
          />
        </CenterPanel>
        
        <RightPanel>
          <CluesList 
            clues={crosswordData.clues}
          />
        </RightPanel>
      </GameContent>
    </GameContainer>
  );
};

export default CrosswordGame; 