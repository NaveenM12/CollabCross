import { useState, useEffect, useRef, useCallback } from 'react';
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
  align-items: center;
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  background-color: ${darkTheme.background.primary};
  color: ${darkTheme.text.primary};
`;

const GameContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  gap: 40px;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
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
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 600px;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 0;
  padding-top: 40px;
  background-color: ${darkTheme.background.secondary};
  border-radius: 8px;
  width: 100%;
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

// Add this styled component near the other styled components at the top
const EditButton = styled.button`
  background-color: ${darkTheme.brand.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  
  &:hover {
    background-color: ${darkTheme.brand.secondary};
  }
`;

// Add popup styled components
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: ${darkTheme.background.elevated};
  padding: 30px;
  border-radius: 12px;
  max-width: 450px;
  width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const PopupTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 15px 0;
  color: ${props => props.isSuccess ? darkTheme.brand.primary : '#ff4444'};
`;

const PopupMessage = styled.p`
  font-size: 16px;
  margin: 0 0 20px 0;
  color: ${darkTheme.text.primary};
  line-height: 1.5;
`;

const PopupButton = styled.button`
  background: ${props => props.isSuccess ? darkTheme.brand.primary : '#ff4444'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PopupEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

// Add styled components for the completion time display
const CompletionTimeWrapper = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompletionTimeLabel = styled.div`
  font-size: 14px;
  color: ${darkTheme.text.secondary};
  margin-bottom: 5px;
`;

const CompletionTimeValue = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${darkTheme.brand.primary};
  font-family: monospace;
`;

// Add styled components for the leaderboard
const LeaderboardContainer = styled.div`
  margin-top: 25px;
  width: 100%;
  border-top: 1px solid ${darkTheme.border.primary};
  padding-top: 15px;
`;

const LeaderboardTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 18px;
  color: ${darkTheme.text.primary};
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const LeaderboardRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${darkTheme.background.secondary};
  }
  
  ${props => props.isUser && `
    background-color: ${darkTheme.background.tertiary} !important;
    font-weight: bold;
  `}
`;

const LeaderboardCell = styled.td`
  padding: 8px 10px;
  font-size: 14px;
  
  &:first-child {
    width: 30px;
    text-align: center;
  }
  
  ${props => props.highlight && `
    color: ${darkTheme.brand.primary};
    font-weight: bold;
  `}
`;

const LeaderboardHeader = styled.th`
  padding: 8px 10px;
  font-size: 14px;
  color: ${darkTheme.text.secondary};
  font-weight: normal;
  border-bottom: 1px solid ${darkTheme.border.primary};
  
  &:first-child {
    width: 30px;
    text-align: center;
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

// Utility to assign crossword numbers to the grid for gameplay modes
function assignCrosswordNumbers(grid, clues) {
  let number = 1;
  const clueMap = {};
  const newGrid = grid.map((row, r) =>
    row.map((cell, c) => {
      if (cell.isBlack) return { ...cell, number: null };
      let isStart = false;
      // Check for across start
      if (
        !cell.isBlack &&
        (c === 0 || row[c - 1].isBlack) &&
        c + 1 < row.length && !row[c + 1].isBlack
      ) {
        isStart = true;
      }
      // Check for down start
      if (
        !cell.isBlack &&
        (r === 0 || grid[r - 1][c].isBlack) &&
        r + 1 < grid.length && !grid[r + 1][c].isBlack
      ) {
        isStart = true;
      }
      if (isStart) {
        clueMap[`${r},${c}`] = number;
        return { ...cell, number: number++ };
      }
      return { ...cell, number: null };
    })
  );
  return newGrid;
}

const fillPuzzle = (shouldBeBlank = false) => {
  // Precisely recreated black square pattern from the second image (true = black, false = white)
  const blackSquares = [
    [false, false, false, false, true, false, false, false, true, true, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, true, false, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, true, false, false, false, false, false, false],
    [false, false, false, true, false, false, false, false, true, false, false, false, true, true, false],
    [true, true, true, false, false, false, false, true, false, false, false, false, true, false, false],
    [false, false, false, false, true, true, false, false, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, true, true, false, false, true, false, false, false, false],
    [true, true, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true, true, false, false, false, true, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, true, false, false, false, true, true, true],
    [false, false, false, false, true, false, false, true, false, false, false, true, false, false, false],
    [false, false, true, true, false, false, false, false, false, false, true, false, false, false, false],
    [false, false, false, true, false, false, false, false, false, true, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, true, false, false, false, false, false, false],
    [false, false, false, false, true, true, false, false, true, false, false, false, false, false, false]
  ];

  // Precisely recreated numbering from the second image (null = no number, otherwise the number)
  const numbers = [
    [1, 2, 3, 4, null, 5, 6, 7, null, null, 8, 9, 10, 11, 12],
    [13, null, null, null, null, 14, null, null, null, 15, null, null, null, null, null],
    [16, null, null, null, null, 17, null, null, null, 18, null, null, null, null, null],
    [19, null, null, null, 20, null, null, null, null, 21, null, null, null, null, null],
    [null, null, null, 22, null, null, null, null, 23, null, null, null, 24, 25, 26],
    [27, null, null, null, null, null, 28, null, 29, null, null, 30, null, null, null],
    [31, null, null, null, 32, null, null, null, null, null, null, null, null, null, null],
    [null, null, 33, null, null, 34, null, null, null, null, 35, null, null, null, null],
    [36, 37, 38, null, null, null, 39, null, 40, null, null, null, null, null, null],
    [41, null, null, null, 42, 43, null, null, null, 44, 45, null, null, null, null],
    [46, null, null, null, null, null, 47, null, 48, 49, null, null, 50, null, null],
    [null, null, null, null, 51, null, null, 52, 53, null, null, 54, null, null, 55],
    [56, 57, null, null, null, 58, null, null, 59, null, null, null, null, null, null],
    [60, null, null, null, null, 61, null, null, null, 62, null, null, null, null, null],
    [63, null, null, null, null, null, 64, null, null, 65, null, null, null, null, null]
  ];

  // Build the grid with the exact pattern from the image
  const filledGrid = Array(15).fill().map((_, r) =>
    Array(15).fill().map((_, c) => ({
      value: '',
      isBlack: blackSquares[r][c],
      number: numbers[r][c],
      correctValue: '', // Will be filled below
    }))
  );

  // Map the clues to cells and fill in correctValue
  // Create a map of clue numbers to their answers
  const clueAnswers = {};
  crosswordData.clues.across.forEach(clue => {
    clueAnswers[`across-${clue.number}`] = clue.answer;
  });
  crosswordData.clues.down.forEach(clue => {
    clueAnswers[`down-${clue.number}`] = clue.answer;
  });

  // Fill in correctValue for across words
  for (let r = 0; r < 15; r++) {
    for (let c = 0; c < 15; c++) {
      if (!blackSquares[r][c] && numbers[r][c] !== null) {
        // Check if this is the start of an across word
        if (c === 0 || blackSquares[r][c-1]) {
          const clueNumber = numbers[r][c];
          const answer = clueAnswers[`across-${clueNumber}`];
          
          if (answer) {
            // Fill in the answer letters horizontally
            for (let i = 0; i < answer.length; i++) {
              if (c + i < 15 && !blackSquares[r][c+i]) {
                filledGrid[r][c+i].correctValue = answer[i];
              }
            }
          }
        }
        
        // Check if this is the start of a down word
        if (r === 0 || blackSquares[r-1][c]) {
          const clueNumber = numbers[r][c];
          const answer = clueAnswers[`down-${clueNumber}`];
          
          if (answer) {
            // Fill in the answer letters vertically
            for (let i = 0; i < answer.length; i++) {
              if (r + i < 15 && !blackSquares[r+i][c]) {
                filledGrid[r+i][c].correctValue = answer[i];
              }
            }
          }
        }
      }
    }
  }

  // Log the grid pattern for debugging if needed
  console.log('Grid Pattern:', filledGrid);
  
  return filledGrid;
};

const computeWordBoundaries = (grid) => {
  const cellToWords = {};
  
  // Loop through the grid to find word starts
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = grid[r][c];
      
      // Skip black cells and cells without numbers
      if (cell.isBlack || !cell.number) continue;
      
      // Check for across word
      let isAcrossStart = c === 0 || grid[r][c-1].isBlack;
      if (c < grid[r].length - 1 && !grid[r][c+1].isBlack && isAcrossStart) {
        // Found start of across word
        let wordLength = 1;
        while (c + wordLength < grid[r].length && !grid[r][c + wordLength].isBlack) {
          wordLength++;
        }
        
        // Record this word for all its cells
        for (let i = 0; i < wordLength; i++) {
          const cellKey = `${r},${c+i}`;
          if (!cellToWords[cellKey]) {
            cellToWords[cellKey] = [];
          }
          cellToWords[cellKey].push({
            direction: 'across',
            number: cell.number,
            length: wordLength
          });
        }
      }
      
      // Check for down word
      let isDownStart = r === 0 || grid[r-1][c].isBlack;
      if (r < grid.length - 1 && !grid[r+1][c].isBlack && isDownStart) {
        // Found start of down word
        let wordLength = 1;
        while (r + wordLength < grid.length && !grid[r + wordLength][c].isBlack) {
          wordLength++;
        }
        
        // Record this word for all its cells
        for (let i = 0; i < wordLength; i++) {
          const cellKey = `${r+i},${c}`;
          if (!cellToWords[cellKey]) {
            cellToWords[cellKey] = [];
          }
          cellToWords[cellKey].push({
            direction: 'down',
            number: cell.number,
            length: wordLength
          });
        }
      }
    }
  }
  
  return cellToWords;
};

const CrosswordGame = ({ mode, onModeChange, onBackToHome, puzzleId }) => {
  // Initialize with blank grid for gameplay modes
  const isGameplayMode = mode === 'competitive' || mode === 'collaborative' || mode === 'collab' || mode === 'solo';
  const [grid, setGrid] = useState(() => {
    const baseGrid = fillPuzzle(!isGameplayMode ? false : true);
    // Do not apply assignCrosswordNumbers as we're using the exact numbering from the image
    return baseGrid;
  });
  
  // Initialize player state with empty values for gameplay modes
  const [currentPlayer, setCurrentPlayer] = useState('You');
  const [players, setPlayers] = useState([
    { id: 'player1', name: 'You', squaresFilled: 0, wordsSolved: 0, score: 0 },
    { id: 'player2', name: 'Dr_Dome', squaresFilled: 0, wordsSolved: 0, score: 0 }
  ]);
  
  // Initialize with appropriate messages based on mode
  const initialChatMessages = isGameplayMode ? 
    [{ 
      sender: 'system', 
      text: mode === 'collaborative' || mode === 'collab' ? 
        'You and Dr_Dome are connected! Work together to solve the puzzle.' : 
        'Competitive mode activated! Race against other players to solve the puzzle.' 
    }] : 
    [{ sender: 'system', text: 'Welcome to CrosswordGame!' }];
  
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
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
  
  // Add states for popups and last letter toggle
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [lastLetterToggle, setLastLetterToggle] = useState(true);
  const [completionTime, setCompletionTime] = useState('');
  const [focusedClue, setFocusedClue] = useState('');
  
  // Create a timer using useRef and useEffect
  const timerRef = useRef(null);
  
  // Add this state:
  const [cellToWords, setCellToWords] = useState({});
  
  // Define loadCreatedPuzzle function
  const loadCreatedPuzzle = useCallback((puzzleData) => {
    // Handle case where we're passed a puzzle ID instead of puzzle data
    let puzzle = puzzleData;
    
    if (typeof puzzleData === 'number' || typeof puzzleData === 'string') {
      // We were passed an ID, look up the puzzle
      const savedPuzzles = window.savedPuzzles || [];
      puzzle = savedPuzzles.find(p => p.id === puzzleData);
      if (!puzzle) return; // Puzzle not found
    }
    
    // Now we have the puzzle data, proceed with loading it
    setPuzzleTitle(puzzle.title);
    
    // Set puzzleStats with avgTime and rating from the puzzle, or defaults
    setPuzzleStats({
      avgTime: puzzle.avgTime || '11:34',
      yourTime: '00:00',
      rating: puzzle.rating || 1100
    });
    
    // Find the maximum dimensions needed for the puzzle
    let maxRow = 0;
    let maxCol = 0;
    
    puzzle.words.forEach(wordData => {
      if (wordData.direction === 'across') {
        maxRow = Math.max(maxRow, wordData.row);
        maxCol = Math.max(maxCol, wordData.col + wordData.word.length - 1);
      } else {
        maxRow = Math.max(maxRow, wordData.row + wordData.word.length - 1);
        maxCol = Math.max(maxCol, wordData.col);
      }
    });
    
    // Add some padding around the puzzle
    const padding = 2;
    const gridSize = Math.max(15, Math.max(maxRow, maxCol) + padding);
    
    // Create a completely empty grid
    const newGrid = Array(gridSize).fill().map(() => 
      Array(gridSize).fill().map(() => ({ 
        value: '', 
        isBlack: true,
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
    
    // First pass: Process across words to establish initial numbers
    let nextNumber = 1;
    const cellNumbers = {}; // Track cell numbers by position
    
    sortedWords.filter(word => word.direction === 'across').forEach(wordData => {
      const { word, clue, row, col } = wordData;
      const cellKey = `${row},${col}`;
      
      // Assign number if cell doesn't have one
      if (!cellNumbers[cellKey]) {
        cellNumbers[cellKey] = nextNumber++;
      }
      
      // Add clue with the cell's number
      acrossClues.push({ 
        number: cellNumbers[cellKey], 
        clue, 
        answer: word 
      });
      
      // Clear cells for this word
      for (let i = 0; i < word.length; i++) {
        if (row >= 0 && row < newGrid.length && 
            (col + i) >= 0 && (col + i) < newGrid[0].length) {
          newGrid[row][col + i].isBlack = false;
        }
      }
      
      // Set the number on the first cell
      if (row >= 0 && row < newGrid.length && 
          col >= 0 && col < newGrid[0].length) {
        newGrid[row][col].number = cellNumbers[cellKey];
      }
    });
    
    // Second pass: Process down words, reusing numbers when possible
    sortedWords.filter(word => word.direction === 'down').forEach(wordData => {
      const { word, clue, row, col } = wordData;
      const cellKey = `${row},${col}`;
      
      // Assign number if cell doesn't have one
      if (!cellNumbers[cellKey]) {
        cellNumbers[cellKey] = nextNumber++;
      }
      
      // Add clue with the cell's number
      downClues.push({ 
        number: cellNumbers[cellKey], 
        clue, 
        answer: word 
      });
      
      // Clear cells for this word
      for (let i = 0; i < word.length; i++) {
        if ((row + i) >= 0 && (row + i) < newGrid.length && 
            col >= 0 && col < newGrid[0].length) {
          newGrid[row + i][col].isBlack = false;
        }
      }
      
      // Set the number on the first cell
      if (row >= 0 && row < newGrid.length && 
          col >= 0 && col < newGrid[0].length) {
        newGrid[row][col].number = cellNumbers[cellKey];
      }
    });
    
    // Sort clues by number
    acrossClues.sort((a, b) => a.number - b.number);
    downClues.sort((a, b) => a.number - b.number);
    
    // Third pass: Place the correct letters in the grid (but not the visible values for gameplay)
    sortedWords.forEach(wordData => {
      const { word, row, col, direction } = wordData;
      
      // Place letters in the grid
      for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        
        if (direction === 'across') {
          if (row >= 0 && row < newGrid.length && 
              (col + i) >= 0 && (col + i) < newGrid[0].length) {
            newGrid[row][col + i].correctValue = letter;
          }
        } else { // direction === 'down'
          if ((row + i) >= 0 && (row + i) < newGrid.length && 
              col >= 0 && col < newGrid[0].length) {
            newGrid[row + i][col].correctValue = letter;
          }
        }
      }
    });
    
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
  }, []);
  
  // Load a default puzzle if no user-created puzzle was specified
  const loadDefaultPuzzle = () => {
    // Use fillPuzzle to create a default puzzle (blank for gameplay modes)
    const defaultGrid = fillPuzzle(isGameplayMode);
    setGrid(defaultGrid);
    
    // Compute word boundaries for scoring purposes
    const wordBoundaries = computeWordBoundaries(defaultGrid);
    setCellToWords(wordBoundaries);
    
    // Create new clues that match our grid numbering
    const gridNumbers = new Set();
    for (let r = 0; r < defaultGrid.length; r++) {
      for (let c = 0; c < defaultGrid[r].length; c++) {
        if (defaultGrid[r][c].number) {
          gridNumbers.add(defaultGrid[r][c].number);
        }
      }
    }
    
    // Filter and remap the original clues to match our grid numbering
    const acrossClues = crosswordData.clues.across
      .filter(clue => gridNumbers.has(clue.number))
      .map(clue => ({
        ...clue,
      }));
      
    const downClues = crosswordData.clues.down
      .filter(clue => gridNumbers.has(clue.number))
      .map(clue => ({
        ...clue,
      }));
    
    // Create a full set of clues for our crossword
    const updatedClues = {
      across: acrossClues,
      down: downClues
    };
    
    setClues(updatedClues);
    
    // Count non-black cells for progress tracking
    let nonBlackCellCount = 0;
    let filledCount = 0;
    
    defaultGrid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isBlack) {
          nonBlackCellCount++;
          if (cell.value) filledCount++;
        }
      });
    });
    
    setTotalCells(nonBlackCellCount);
    setFilledCells(filledCount);
    setProgress(Math.floor((filledCount / nonBlackCellCount) * 100));
    
    // Set default puzzle stats - ensure avg time and rating are included
    setPuzzleStats({
      difficulty: 'Medium',
      size: '15×15',
      totalSquares: nonBlackCellCount,
      theme: 'General Knowledge',
      yourTime: '00:00',
      avgTime: '11:47',
      rating: '2200'
    });
    
    // Set default puzzle title
    setPuzzleTitle('Daily Crossword');
    
    // Reset players stats for gameplay modes
    if (isGameplayMode) {
      setPlayers([
        { id: 'player1', name: 'You', squaresFilled: 0, wordsSolved: 0, score: 0 },
        { id: 'player2', name: 'Dr_Dome', squaresFilled: 0, wordsSolved: 0, score: 0 }
      ]);
    }
  };
  
  // Load a crossword puzzle either from saved puzzles or default puzzles
  const loadCrosswordPuzzle = useCallback((puzzleId) => {
    // First check if there's a user-created puzzle with this ID
    if (puzzleId && window.savedPuzzles) {
      const savedPuzzle = window.savedPuzzles.find(p => p.id === puzzleId);
      if (savedPuzzle) {
        return loadCreatedPuzzle(savedPuzzle);
      }
    }
    
    // Otherwise load a default puzzle
    loadDefaultPuzzle();
  }, []);
  
  // Initialize based on game mode
  useEffect(() => {
    // If this is a gameplay mode, set initial state based on mode
    if (isGameplayMode) {
      // Set up initial game state
      loadDefaultPuzzle();
      
      // Add a welcome message appropriate to the mode
      if (mode === 'collaborative' || mode === 'collab') {
        setChatMessages([
          { sender: 'system', text: 'You and Dr_Dome are connected! Work together to solve the puzzle.' },
          { sender: 'Dr_Dome', text: 'Hi! Let\'s solve this crossword together!' }
        ]);
      } else if (mode === 'competitive' || mode === 'solo') {
        setChatMessages([
          { sender: 'system', text: 'Competitive mode activated! Race against other players to solve the puzzle.' }
        ]);
      }
    }
    
    // Start timer for all modes
    timerRef.current = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    
    // Clean up timer when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [mode, isGameplayMode]);
  
  useEffect(() => {
    // If a puzzleId is provided, load that created puzzle
    if (puzzleId) {
      loadCrosswordPuzzle(puzzleId);
    }
  }, [puzzleId]);

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

  // Add a function to generate leaderboard data based on user's time
  const generateLeaderboard = (userTime) => {
    // Convert user time from "MM:SS" format to seconds
    const [userMinutes, userSeconds] = userTime.split(':').map(Number);
    const userTotalSeconds = userMinutes * 60 + userSeconds;
    
    // Define fixed leaderboard entries
    const fixedEntries = [
      { name: 'CrypticMaster', time: '00:42', seconds: 42 },
      { name: 'WordWizard', time: '01:15', seconds: 75 },
      { name: 'PuzzlePro', time: '02:10', seconds: 130 },
      { name: 'CrossMaster', time: '02:47', seconds: 167 },
      { name: 'GridGuru', time: '03:21', seconds: 201 }
    ];
    
    // Add user entry
    const userEntry = { name: 'You', time: userTime, seconds: userTotalSeconds, isUser: true };
    
    // Combine all entries and sort by time (in seconds)
    const allEntries = [...fixedEntries, userEntry].sort((a, b) => a.seconds - b.seconds);
    
    // Get top 5 entries
    return allEntries.slice(0, 5);
  };

  const handleCellClick = (row, col) => {
    // Only allow clicking on non-black cells
    if (grid[row][col].isBlack) return;

    // Create a new grid with the updated cell
    const newGrid = grid.map((rowArray, r) =>
      rowArray.map((cell, c) => {
        if (r === row && c === col) {
          // Toggle between empty and correct letter
          if (cell.value === '') {
            return { ...cell, value: cell.correctValue || '' };
          } else {
            return { ...cell, value: '' };
          }
        }
        return cell;
      })
    );

    setGrid(newGrid);

    // Update filled cells count
    let filled = 0;
    let total = 0;
    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[r].length; c++) {
        if (!newGrid[r][c].isBlack) {
          total++;
          if (newGrid[r][c].value) {
            filled++;
          }
        }
      }
    }
    setFilledCells(filled);
    setTotalCells(total);
    setProgress(Math.floor((filled / total) * 100));

    // Check for completed words
    const cellKey = `${row},${col}`;
    const wordsForCell = cellToWords[cellKey] || [];
    const completedWords = [];
    
    wordsForCell.forEach(word => {
      let isComplete = true;
      
      if (word.direction === 'across') {
        for (let i = 0; i < word.length; i++) {
          const c = col - (cellKey.split(',')[1] - col) + i;
          if (c < 0 || c >= newGrid[row].length || !newGrid[row][c].value) {
            isComplete = false;
            break;
          }
        }
      } else if (word.direction === 'down') {
        for (let i = 0; i < word.length; i++) {
          const r = row - (cellKey.split(',')[0] - row) + i;
          if (r < 0 || r >= newGrid.length || !newGrid[r][col].value) {
            isComplete = false;
            break;
          }
        }
      }
      
      if (isComplete) {
        completedWords.push(word);
      }
    });
    
    // Update player stats with word progress
    if (completedWords.length > 0) {
      setPlayers(prevPlayers => prevPlayers.map(player =>
        player.name === currentPlayer ? {
          ...player,
          squaresFilled: filled,
          wordsSolved: player.wordsSolved + completedWords.length
        } : player
      ));
    } else {
      setPlayers(prevPlayers => prevPlayers.map(player =>
        player.name === currentPlayer ? {
          ...player,
          squaresFilled: filled
        } : player
      ));
    }

    // Check if puzzle is complete (all fillable cells are filled)
    let isFilled = filled === total;
    let isCorrect = true;
    
    if (isFilled) {
      // Check if all filled values are correct
      for (let r = 0; r < newGrid.length; r++) {
        for (let c = 0; c < newGrid[r].length; c++) {
          const cell = newGrid[r][c];
          if (!cell.isBlack && cell.correctValue && cell.value !== cell.correctValue) {
            isCorrect = false;
            break;
          }
        }
        if (!isCorrect) break;
      }

      // Show appropriate popup based on correctness
      if (isCorrect) {
        setCompletionTime(puzzleStats.yourTime);
        setShowSuccessPopup(true);
        setShowErrorPopup(false);
      } else {
        setShowErrorPopup(true);
        setShowSuccessPopup(false);
      }
    }
  };

  // Add a function to close popups
  const closePopups = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
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
          
          {(mode === 'collaborative' || mode === 'collab') && (
            <ChatBox 
              messages={chatMessages}
              onSendMessage={addChatMessage}
              activeUsers={['Dr_Dome']}
            />
          )}
        </LeftPanel>
        
        <CenterPanel>
          <GridContainer>
            <CrosswordGrid
              grid={grid}
              onCellClick={handleCellClick}
              focusedClue={focusedClue}
            />
          </GridContainer>
          
          {/* Only show Edit button if this is a user-created puzzle */}
          {window.savedPuzzles?.some(p => p.id === puzzleId) && (
            <EditButton onClick={() => onBackToHome('create', puzzleId)}>
              Edit Crossword
            </EditButton>
          )}
        </CenterPanel>
        
        <RightPanel>
          <CluesList 
            clues={clues}
            focusedClue={focusedClue}
            onClueSelected={setFocusedClue}
          />
        </RightPanel>
      </GameContent>

      {/* Add the popups */}
      {showSuccessPopup && (
        <PopupOverlay onClick={closePopups}>
          <PopupContent onClick={e => e.stopPropagation()}>
            <PopupEmoji>🎉</PopupEmoji>
            <PopupTitle isSuccess={true}>Congratulations!</PopupTitle>
            <PopupMessage>
              You've successfully completed the crossword puzzle!
            </PopupMessage>
            
            <CompletionTimeWrapper>
              <CompletionTimeLabel>YOUR TIME</CompletionTimeLabel>
              <CompletionTimeValue>{completionTime}</CompletionTimeValue>
            </CompletionTimeWrapper>
            
            <LeaderboardContainer>
              <LeaderboardTitle>Leaderboard</LeaderboardTitle>
              <LeaderboardTable>
                <thead>
                  <tr>
                    <LeaderboardHeader>#</LeaderboardHeader>
                    <LeaderboardHeader>Player</LeaderboardHeader>
                    <LeaderboardHeader>Time</LeaderboardHeader>
                  </tr>
                </thead>
                <tbody>
                  {generateLeaderboard(completionTime).map((entry, index) => (
                    <LeaderboardRow key={index} isUser={entry.isUser}>
                      <LeaderboardCell>{index + 1}</LeaderboardCell>
                      <LeaderboardCell highlight={entry.isUser}>{entry.name}</LeaderboardCell>
                      <LeaderboardCell highlight={entry.isUser}>{entry.time}</LeaderboardCell>
                    </LeaderboardRow>
                  ))}
                </tbody>
              </LeaderboardTable>
            </LeaderboardContainer>
            
            <PopupButton isSuccess={true} onClick={closePopups}>
              Continue
            </PopupButton>
          </PopupContent>
        </PopupOverlay>
      )}

      {showErrorPopup && (
        <PopupOverlay onClick={closePopups}>
          <PopupContent onClick={e => e.stopPropagation()}>
            <PopupEmoji>❌</PopupEmoji>
            <PopupTitle isSuccess={false}>Not Quite Right</PopupTitle>
            <PopupMessage>
              One or more squares are incorrect. Keep trying!
            </PopupMessage>
            <PopupButton isSuccess={false} onClick={closePopups}>
              Try Again
            </PopupButton>
          </PopupContent>
        </PopupOverlay>
      )}
    </GameContainer>
  );
};

export default CrosswordGame; 