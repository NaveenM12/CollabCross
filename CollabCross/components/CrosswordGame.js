import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import GameHeader from './GameHeader';
import CrosswordGrid from './CrosswordGrid';
import CluesList from './CluesList';
import PlayerStats from './PlayerStats';
import ChatBox from './ChatBox';
import { darkTheme } from '../styles/theme';

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
  width: 320px;
  padding: 20px;
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

// Add a new styled component for the progress bar
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${darkTheme.background.elevated};
  border-radius: 6px;
  margin: 15px 0;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  background-image: linear-gradient(to right, #4caf50, #8bc34a);
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

const CrosswordGame = ({ mode, onModeChange, onBackToHome, puzzleId }) => {
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
    yourTime: '00:00',
    rating: '1100'
  });
  const [puzzleTitle, setPuzzleTitle] = useState("Daily Crossword");
  const [clues, setClues] = useState(crosswordData.clues);
  
  // Add states for timer and progress
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalCells, setTotalCells] = useState(0);
  const [filledCells, setFilledCells] = useState(0);
  
  // Create a timer using useRef and useEffect
  const timerRef = useRef(null);
  
  // Initialize timer when component mounts
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    
    // Clean up timer when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Update the time display whenever secondsElapsed changes
  useEffect(() => {
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    setPuzzleStats(prev => ({
      ...prev,
      yourTime: formattedTime
    }));
  }, [secondsElapsed]);

  useEffect(() => {
    // If a puzzleId is provided, load that created puzzle
    if (puzzleId) {
      loadCreatedPuzzle(puzzleId);
    }
  }, [puzzleId]);

  // Calculate progress whenever filledCells or totalCells changes
  useEffect(() => {
    if (totalCells > 0) {
      const newProgress = Math.floor((filledCells / totalCells) * 100);
      setProgress(newProgress);
    }
  }, [filledCells, totalCells]);

  // Initialize totalCells and filledCells for the default puzzle
  useEffect(() => {
    if (!puzzleId) {
      // Count non-black cells and filled cells in the default puzzle
      let nonBlackCells = 0;
      let filled = 0;
      
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          if (!grid[r][c].isBlack) {
            nonBlackCells++;
            if (grid[r][c].value) {
              filled++;
            }
          }
        }
      }
      
      setTotalCells(nonBlackCells);
      setFilledCells(filled);
    }
  }, []);

  const loadCreatedPuzzle = (id) => {
    // In a real app, you would fetch the puzzle from a database
    // Here, we'll mock it by finding it in localStorage or a mock storage
    
    // For demo purposes, let's assume we can access this from the window object
    // In a real app, you'd want to use Context, Redux, or another state management solution
    const savedPuzzles = window.savedPuzzles || [];
    const puzzle = savedPuzzles.find(p => p.id === id);
    
    if (puzzle) {
      setPuzzleTitle(puzzle.title);
      
      // Create a completely empty grid
      const newGrid = Array(15).fill().map(() => 
        Array(15).fill().map(() => ({ 
          value: '', 
          isBlack: true, // Start with all black cells
          number: null,
          correctValue: null
        }))
      );
      
      // Create clues arrays
      const acrossClues = [];
      const downClues = [];
      
      // Sort words for consistent numbering
      const sortedWords = [...puzzle.words].sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        return a.col - b.col;
      });
      
      // First pass: Clear paths for words and set numbers
      sortedWords.forEach(wordData => {
        const { word, clue, row, col, direction, number } = wordData;
        
        // Convert 1-based indices to 0-based for the grid
        // Our grid is 0-indexed, but puzzle data uses 1-indexed positions
        const gridRow = row - 1;
        const gridCol = col - 1;
        
        // Add the clue to the appropriate array
        if (direction === 'across') {
          acrossClues.push({ number, clue, answer: word });
          
          // Clear cells for this word (make them not black)
          for (let i = 0; i < word.length; i++) {
            if (gridRow >= 0 && gridRow < newGrid.length && 
                (gridCol + i) >= 0 && (gridCol + i) < newGrid[0].length) {
              newGrid[gridRow][gridCol + i].isBlack = false;
            }
          }
          
          // Set the number on the first cell if it doesn't have one
          if (gridRow >= 0 && gridRow < newGrid.length && 
              gridCol >= 0 && gridCol < newGrid[0].length) {
            if (!newGrid[gridRow][gridCol].number) {
              newGrid[gridRow][gridCol].number = number;
            }
          }
        } else { // direction === 'down'
          downClues.push({ number, clue, answer: word });
          
          // Clear cells for this word (make them not black)
          for (let i = 0; i < word.length; i++) {
            if ((gridRow + i) >= 0 && (gridRow + i) < newGrid.length && 
                gridCol >= 0 && gridCol < newGrid[0].length) {
              newGrid[gridRow + i][gridCol].isBlack = false;
            }
          }
          
          // Set the number on the first cell if it doesn't have one
          if (gridRow >= 0 && gridRow < newGrid.length && 
              gridCol >= 0 && gridCol < newGrid[0].length) {
            if (!newGrid[gridRow][gridCol].number) {
              newGrid[gridRow][gridCol].number = number;
            }
          }
        }
      });
      
      // Second pass: Place the correct letters in the grid
      sortedWords.forEach(wordData => {
        const { word, row, col, direction } = wordData;
        
        // Convert 1-based indices to 0-based for the grid
        const gridRow = row - 1;
        const gridCol = col - 1;
        
        // Place letters in the grid
        for (let i = 0; i < word.length; i++) {
          const letter = word[i];
          
          if (direction === 'across') {
            if (gridRow >= 0 && gridRow < newGrid.length && 
                (gridCol + i) >= 0 && (gridCol + i) < newGrid[0].length) {
              newGrid[gridRow][gridCol + i].correctValue = letter;
            }
          } else { // direction === 'down'
            if ((gridRow + i) >= 0 && (gridRow + i) < newGrid.length && 
                gridCol >= 0 && gridCol < newGrid[0].length) {
              newGrid[gridRow + i][gridCol].correctValue = letter;
            }
          }
        }
      });
      
      // Sort clues by number
      acrossClues.sort((a, b) => a.number - b.number);
      downClues.sort((a, b) => a.number - b.number);
      
      setClues({
        across: acrossClues,
        down: downClues
      });
      
      setGrid(newGrid);
      
      // Calculate total number of non-black cells for progress tracking
      let nonBlackCells = 0;
      for (let r = 0; r < newGrid.length; r++) {
        for (let c = 0; c < newGrid[r].length; c++) {
          if (!newGrid[r][c].isBlack) {
            nonBlackCells++;
          }
        }
      }
      setTotalCells(nonBlackCells);
      setFilledCells(0);
      setProgress(0);
      
      // For custom puzzles, only show the user as player
      setPlayers([
        { id: 'player1', name: 'You', squaresFilled: 0, wordsSolved: 0, score: 0 }
      ]);
      
      // Clear chat for single player mode
      setChatMessages([
        { sender: 'system', text: `Playing your created puzzle: "${puzzle.title}"` }
      ]);
      
      // Reset timer
      setSecondsElapsed(0);
    }
  };

  const handleCellClick = (row, col) => {
    if (!grid[row][col] || grid[row][col].isBlack) return;
    
    // In a real app, you would update the cell value based on user input
    // For demonstration, just fill with the correct value
    const newGrid = JSON.parse(JSON.stringify(grid)); // Deep copy
    
    if (newGrid[row][col].correctValue) {
      // Toggle between showing the value and emptying it (allows user to undo)
      if (newGrid[row][col].value === newGrid[row][col].correctValue) {
        newGrid[row][col].value = '';
        setFilledCells(prev => prev - 1); // Decrease filled cells count
        
        // Also update player stats when removing a letter
        const newPlayers = [...players];
        newPlayers[0].squaresFilled = Math.max(0, newPlayers[0].squaresFilled - 1);
        setPlayers(newPlayers);
      } else {
        newGrid[row][col].value = newGrid[row][col].correctValue;
        setFilledCells(prev => prev + 1); // Increase filled cells count
        
        // Update player stats when filling in a square correctly
        const newPlayers = [...players];
        newPlayers[0].squaresFilled += 1;
        
        // Check if this completes a word
        const completedWord = checkForCompletedWord(newGrid, row, col);
        if (completedWord) {
          newPlayers[0].wordsSolved += 1;
          newPlayers[0].score += completedWord.length * 5; // 5 points per letter
        }
        
        setPlayers(newPlayers);
      }
    } else {
      // Fallback if correctValue is not set
      newGrid[row][col].value = 'A';
      setFilledCells(prev => prev + 1); // Increase filled cells count
      
      // Update player stats when filling in a square
      const newPlayers = [...players];
      newPlayers[0].squaresFilled += 1;
      setPlayers(newPlayers);
    }
    
    setGrid(newGrid);
  };
  
  const checkForCompletedWord = (grid, row, col) => {
    // Check for completed across word
    let acrossWord = '';
    let acrossComplete = true;
    
    // Find start of across word
    let startCol = col;
    while (startCol > 0 && !grid[row][startCol-1].isBlack) {
      startCol--;
    }
    
    // Check if entire word is filled
    for (let c = startCol; c < grid[0].length && !grid[row][c].isBlack; c++) {
      if (!grid[row][c].value) {
        acrossComplete = false;
        break;
      }
      acrossWord += grid[row][c].value;
    }
    
    // Check for completed down word
    let downWord = '';
    let downComplete = true;
    
    // Find start of down word
    let startRow = row;
    while (startRow > 0 && !grid[startRow-1][col].isBlack) {
      startRow--;
    }
    
    // Check if entire word is filled
    for (let r = startRow; r < grid.length && !grid[r][col].isBlack; r++) {
      if (!grid[r][col].value) {
        downComplete = false;
        break;
      }
      downWord += grid[r][col].value;
    }
    
    // Return the completed word (or the longer one if both are completed)
    if (acrossComplete && downComplete) {
      return acrossWord.length >= downWord.length ? acrossWord : downWord;
    } else if (acrossComplete) {
      return acrossWord;
    } else if (downComplete) {
      return downWord;
    }
    
    return null;
  };

  const addChatMessage = (message) => {
    setChatMessages([...chatMessages, { sender: 'You', text: message }]);
    
    // Simulate response from other player if in collaborative mode
    if (mode === 'collaborative') {
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'Dr_Dome', text: 'I think 3-Down is "ASITIS"!' }]);
      }, 1000);
    }
  };

  const handleBackToHome = () => {
    onBackToHome(); // Use the original flow when going back from the game
  };

  return (
    <GameContainer>
      <GameHeader 
        mode={mode} 
        puzzleStats={puzzleStats}
        puzzleTitle={puzzleTitle}
        onModeChange={onModeChange}
        onBackToHome={handleBackToHome}
      />
      
      <ProgressBarContainer>
        <ProgressBarFill progress={progress} />
      </ProgressBarContainer>
      
      <GameContent>
        <LeftPanel>
          <PlayerStats 
            players={players.map(player => ({
              ...player,
              estimatedTotalSquares: totalCells
            }))}
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
            clues={clues}
          />
        </RightPanel>
      </GameContent>
    </GameContainer>
  );
};

export default CrosswordGame; 