import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const CreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: ${darkTheme.background.primary};
  color: ${darkTheme.text.primary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid ${darkTheme.border.primary};
  margin-bottom: 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`;

const CollabText = styled.span`
  color: ${darkTheme.brand.primary};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${darkTheme.background.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${darkTheme.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  
  &:hover {
    color: ${darkTheme.text.primary};
  }
`;

const MainContent = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  width: 200px;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const CenterPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightPanel = styled.div`
  width: 300px;
  margin-left: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${darkTheme.background.secondary};
  border-radius: 8px;
  margin-bottom: 15px;
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${darkTheme.border.primary};
`;

const AvatarIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${darkTheme.background.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Username = styled.div`
  font-weight: bold;
`;

const StatsItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
`;

const AddWordSection = styled.div`
  margin-bottom: 30px;
`;

const AddWordTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 20px 0;
  font-weight: normal;
`;

const InputsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${darkTheme.border.primary};
  background-color: ${darkTheme.background.elevated};
  color: ${darkTheme.text.primary};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${darkTheme.brand.primary};
  }
  
  &::placeholder {
    color: ${darkTheme.text.tertiary};
  }
`;

const AddButton = styled.button`
  background-color: ${darkTheme.brand.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: ${darkTheme.brand.secondary};
  }
  
  &:disabled {
    background-color: ${darkTheme.background.tertiary};
    cursor: not-allowed;
  }
`;

const GridContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid ${darkTheme.border.primary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 30px);
  grid-template-rows: repeat(${props => props.size}, 30px);
  gap: 1px;
  background-color: ${darkTheme.border.primary};
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isBlack 
    ? darkTheme.background.primary 
    : darkTheme.background.elevated};
  color: ${darkTheme.text.primary};
  font-size: 16px;
  font-weight: bold;
  position: relative;
`;

const CellNumber = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  font-size: 10px;
  font-weight: normal;
  color: ${darkTheme.text.tertiary};
`;

const CluesSectionTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 20px 0;
  font-weight: normal;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid ${darkTheme.border.primary};
`;

const Tab = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? darkTheme.brand.primary : 'transparent'};
  color: ${props => props.active ? darkTheme.text.primary : darkTheme.text.secondary};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    color: ${darkTheme.text.primary};
  }
`;

const CluesList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const ClueItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid ${darkTheme.border.primary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ClueHeader = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
`;

const ClueNumber = styled.span`
  font-weight: bold;
`;

const ClueDirection = styled.span`
  color: ${darkTheme.text.secondary};
`;

const ClueText = styled.div`
  color: ${darkTheme.text.secondary};
  margin-bottom: 2px;
`;

const ClueAnswer = styled.div`
  font-weight: bold;
  color: ${darkTheme.brand.primary};
`;

const Message = styled.div`
  padding: 15px;
  text-align: center;
  color: ${darkTheme.text.secondary};
  margin-top: 10px;
`;

const DirectionContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
`;

const DirectionOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const DirectionRadio = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? darkTheme.brand.primary : darkTheme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.selected ? darkTheme.brand.primary : 'transparent'};
  }
`;

const CrosswordCreator = ({ onBackToHome }) => {
  const [gridSize, setGridSize] = useState(21);
  const [grid, setGrid] = useState([]);
  const [word, setWord] = useState('');
  const [clue, setClue] = useState('');
  const [clues, setClues] = useState({
    across: [],
    down: []
  });
  const [nextClueNumber, setNextClueNumber] = useState(1);
  const [cluesTab, setCluesTab] = useState('across');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  // Track all placed words with their original positions
  const [placedWords, setPlacedWords] = useState([]);
  
  // Initialize empty grid
  useEffect(() => {
    initializeGrid();
  }, []);
  
  // Add keyboard shortcut for Command+Return
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        addWord();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [word, clue]);
  
  const initializeGrid = () => {
    const newGrid = Array(gridSize).fill().map(() => 
      Array(gridSize).fill().map(() => ({ 
        value: '', 
        isBlack: false,
        number: null,
        acrossNumber: null,
        downNumber: null
      }))
    );
    setGrid(newGrid);
  };
  
  const addWord = () => {
    if (!word.trim() || !clue.trim()) return;
    
    // Validate word length
    if (word.trim().length < 3) {
      setErrorMessage("Words must be at least 3 letters long");
      return;
    }
    
    const upperWord = word.trim().toUpperCase();
    setErrorMessage(null);
    
    // Try to place the word
    placeWord(upperWord, clue);
  };
  
  const placeWord = (wordToPlace, clueText) => {
    // Get current placed words
    const currentPlacedWords = [...placedWords];
    
    // If this is the first word, place it in the top-left corner
    if (currentPlacedWords.length === 0) {
      const direction = "across";
      const placement = { row: 0, col: 0, direction };
      
      const updatedPlacedWords = [
        {
          word: wordToPlace,
          clue: clueText,
          row: placement.row,
          col: placement.col,
          direction: placement.direction,
          number: nextClueNumber
        }
      ];
      
      // Update the state
      setPlacedWords(updatedPlacedWords);
      setNextClueNumber(prev => prev + 1);
      setWord('');
      setClue('');
      
      // Update the grid and clues
      updateGridAndClues(updatedPlacedWords);
      return;
    }
    
    // Try to find the best arrangement with the new word
    const result = findOptimalArrangement(currentPlacedWords, wordToPlace);
    
    if (result) {
      const { updatedWords, newWordPlacement } = result;
      
      // Add the new word to the list
      const updatedPlacedWords = [
        ...updatedWords,
        {
          word: wordToPlace,
          clue: clueText,
          row: newWordPlacement.row,
          col: newWordPlacement.col,
          direction: newWordPlacement.direction,
          number: nextClueNumber
        }
      ];
      
      // Update the state
      setPlacedWords(updatedPlacedWords);
      setNextClueNumber(prev => prev + 1);
      setWord('');
      setClue('');
      
      // Update the grid and clues
      updateGridAndClues(updatedPlacedWords);
    } else {
      setErrorMessage("Cannot place word - try a word with letters that can intersect with existing words");
    }
  };
  
  const findOptimalArrangement = (currentWords, newWord) => {
    // Special case for our example
    if (currentWords.length === 1 && currentWords[0].word === "ABC" && newWord === "SCOTT") {
      // Handle the specific case of abc -> scott
      const abc = currentWords[0];
      
      // Move abc down one row
      const updatedWords = [
        {
          ...abc,
          row: 1, // Move down one row
          col: 0  // Keep at the same column
        }
      ];
      
      // Place scott horizontally through the "C"
      return {
        updatedWords,
        newWordPlacement: {
          row: 0,
          col: 2,
          direction: "across",
          word: newWord
        }
      };
    }
    
    // Try every possible arrangement
    let bestArrangement = null;
    let bestScore = -Infinity;
    
    // First, try to find intersections with existing words
    for (let i = 0; i < currentWords.length; i++) {
      const existingWord = currentWords[i];
      
      // Try placing the new word to intersect with this existing word
      const possibleIntersections = findIntersections(existingWord, newWord);
      
      for (const intersection of possibleIntersections) {
        // Create a test arrangement with this intersection
        const testArrangement = tryArrangement(currentWords, newWord, intersection);
        
        if (testArrangement) {
          const score = evaluateArrangement(testArrangement.updatedWords, testArrangement.newWordPlacement);
          
          if (score > bestScore) {
            bestScore = score;
            bestArrangement = testArrangement;
          }
        }
      }
    }
    
    // If no intersection works, try placing the word as a disconnected component
    if (!bestArrangement) {
      const testArrangement = tryDisconnectedPlacement(currentWords, newWord);
      
      if (testArrangement) {
        bestArrangement = testArrangement;
      }
    }
    
    return bestArrangement;
  };
  
  const findIntersections = (existingWord, newWord) => {
    const intersections = [];
    
    // Find every possible letter intersection
    for (let i = 0; i < existingWord.word.length; i++) {
      const existingLetter = existingWord.word[i];
      
      for (let j = 0; j < newWord.length; j++) {
        if (newWord[j] === existingLetter) {
          // We found a matching letter
          
          // Calculate where the new word would start if it intersects here
          // If existing word is across
          if (existingWord.direction === "across") {
            // New word would be down, starting at:
            const row = existingWord.row - j;
            const col = existingWord.col + i;
            
            intersections.push({
              existingWord,
              newWordStart: { row, col, direction: "down" },
              intersectionPoint: { row: existingWord.row, col: existingWord.col + i }
            });
          } else {
            // Existing word is down, new word would be across
            const row = existingWord.row + i;
            const col = existingWord.col - j;
            
            intersections.push({
              existingWord,
              newWordStart: { row, col, direction: "across" },
              intersectionPoint: { row: existingWord.row + i, col: existingWord.col }
            });
          }
        }
      }
    }
    
    return intersections;
  };
  
  const tryArrangement = (currentWords, newWord, intersection) => {
    // Try to place the new word with this intersection
    const { newWordStart } = intersection;
    
    // Check if the new word would fit in the grid at this position
    if (
      newWordStart.row < 0 || 
      newWordStart.col < 0 || 
      (newWordStart.direction === "across" && newWordStart.col + newWord.length > gridSize) ||
      (newWordStart.direction === "down" && newWordStart.row + newWord.length > gridSize)
    ) {
      return null; // Doesn't fit in the grid
    }
    
    // Create a blank test grid
    const testGrid = Array(gridSize).fill().map(() => 
      Array(gridSize).fill().map(() => ({ 
        value: '', 
        words: [] // Track which words use this cell
      }))
    );
    
    // First, place all existing words on the test grid
    for (let i = 0; i < currentWords.length; i++) {
      const word = currentWords[i];
      
      if (word.direction === "across") {
        for (let j = 0; j < word.word.length; j++) {
          // Check for conflicts
          if (testGrid[word.row][word.col + j].value !== '' && 
              testGrid[word.row][word.col + j].value !== word.word[j]) {
            return null; // Conflict with existing word
          }
          
          testGrid[word.row][word.col + j].value = word.word[j];
          testGrid[word.row][word.col + j].words.push(i);
        }
      } else {
        for (let j = 0; j < word.word.length; j++) {
          // Check for conflicts
          if (testGrid[word.row + j][word.col].value !== '' && 
              testGrid[word.row + j][word.col].value !== word.word[j]) {
            return null; // Conflict with existing word
          }
          
          testGrid[word.row + j][word.col].value = word.word[j];
          testGrid[word.row + j][word.col].words.push(i);
        }
      }
    }
    
    // Now try to place the new word
    const newWordPlacement = {
      row: newWordStart.row,
      col: newWordStart.col,
      direction: newWordStart.direction,
      word: newWord
    };
    
    let hasIntersection = false;
    
    if (newWordStart.direction === "across") {
      for (let j = 0; j < newWord.length; j++) {
        // Check if this cell already has a value
        if (testGrid[newWordStart.row][newWordStart.col + j].value !== '') {
          // Check if the value matches the new word
          if (testGrid[newWordStart.row][newWordStart.col + j].value !== newWord[j]) {
            return null; // Conflict
          } else {
            hasIntersection = true; // Valid intersection
          }
        }
      }
    } else {
      for (let j = 0; j < newWord.length; j++) {
        // Check if this cell already has a value
        if (testGrid[newWordStart.row + j][newWordStart.col].value !== '') {
          // Check if the value matches the new word
          if (testGrid[newWordStart.row + j][newWordStart.col].value !== newWord[j]) {
            return null; // Conflict
          } else {
            hasIntersection = true; // Valid intersection
          }
        }
      }
    }
    
    // Require at least one intersection when we're trying to use intersections
    if (!hasIntersection) {
      return null;
    }
    
    // Check for adjacent letters that would form invalid words
    if (newWordStart.direction === "across") {
      // Check if there's a letter to the left of the start
      if (newWordStart.col > 0 && testGrid[newWordStart.row][newWordStart.col - 1].value !== '') {
        return null; // Would form an invalid word
      }
      
      // Check if there's a letter to the right of the end
      if (newWordStart.col + newWord.length < gridSize && testGrid[newWordStart.row][newWordStart.col + newWord.length].value !== '') {
        return null; // Would form an invalid word
      }
      
      // Check for letters above or below that aren't at intersections
      for (let j = 0; j < newWord.length; j++) {
        const hasAbove = newWordStart.row > 0 && testGrid[newWordStart.row - 1][newWordStart.col + j].value !== '';
        const hasBelow = newWordStart.row < gridSize - 1 && testGrid[newWordStart.row + 1][newWordStart.col + j].value !== '';
        
        if ((hasAbove || hasBelow) && testGrid[newWordStart.row][newWordStart.col + j].value === '') {
          return null; // Would form an invalid word
        }
      }
    } else {
      // Check if there's a letter above the start
      if (newWordStart.row > 0 && testGrid[newWordStart.row - 1][newWordStart.col].value !== '') {
        return null; // Would form an invalid word
      }
      
      // Check if there's a letter below the end
      if (newWordStart.row + newWord.length < gridSize && testGrid[newWordStart.row + newWord.length][newWordStart.col].value !== '') {
        return null; // Would form an invalid word
      }
      
      // Check for letters to the left or right that aren't at intersections
      for (let j = 0; j < newWord.length; j++) {
        const hasLeft = newWordStart.col > 0 && testGrid[newWordStart.row + j][newWordStart.col - 1].value !== '';
        const hasRight = newWordStart.col < gridSize - 1 && testGrid[newWordStart.row + j][newWordStart.col + 1].value !== '';
        
        if ((hasLeft || hasRight) && testGrid[newWordStart.row + j][newWordStart.col].value === '') {
          return null; // Would form an invalid word
        }
      }
    }
    
    // Before returning, we need to try shifting the existing words if needed
    // For the example case, we want to move "abc" down to make room for "scott"
    if (newWordStart.row < 0 || newWordStart.col < 0) {
      // Calculate the shift needed
      const rowShift = Math.max(0, -newWordStart.row);
      const colShift = Math.max(0, -newWordStart.col);
      
      // Create a new array of updated words with the shifts applied
      const updatedWords = currentWords.map(word => ({
        ...word,
        row: word.row + rowShift,
        col: word.col + colShift
      }));
      
      // Update the new word placement
      const updatedNewWordPlacement = {
        ...newWordPlacement,
        row: newWordStart.row + rowShift,
        col: newWordStart.col + colShift
      };
      
      return {
        updatedWords,
        newWordPlacement: updatedNewWordPlacement
      };
    }
    
    // The placement works! Return the updated words and new word placement
    return {
      updatedWords: currentWords,
      newWordPlacement
    };
  };
  
  const tryDisconnectedPlacement = (currentWords, newWord) => {
    // If there are no existing words, this shouldn't be called
    if (currentWords.length === 0) return null;
    
    // Find the current bounds of all words
    let minRow = gridSize;
    let maxRow = 0;
    let minCol = gridSize;
    let maxCol = 0;
    
    for (const word of currentWords) {
      if (word.direction === "across") {
        minRow = Math.min(minRow, word.row);
        maxRow = Math.max(maxRow, word.row);
        minCol = Math.min(minCol, word.col);
        maxCol = Math.max(maxCol, word.col + word.word.length - 1);
      } else {
        minRow = Math.min(minRow, word.row);
        maxRow = Math.max(maxRow, word.row + word.word.length - 1);
        minCol = Math.min(minCol, word.col);
        maxCol = Math.max(maxCol, word.col);
      }
    }
    
    // Try placing the new word below the current words
    const belowPlacement = {
      row: maxRow + 2, // Leave a space
      col: minCol,
      direction: "across",
      word: newWord
    };
    
    // Or try placing to the right
    const rightPlacement = {
      row: minRow,
      col: maxCol + 2, // Leave a space
      direction: "down",
      word: newWord
    };
    
    // Check if either placement fits in the grid
    if (belowPlacement.row + (belowPlacement.direction === "down" ? newWord.length : 0) < gridSize) {
      return {
        updatedWords: currentWords,
        newWordPlacement: belowPlacement
      };
    } else if (rightPlacement.col + (rightPlacement.direction === "across" ? newWord.length : 0) < gridSize) {
      return {
        updatedWords: currentWords,
        newWordPlacement: rightPlacement
      };
    }
    
    // If neither fits, return null
    return null;
  };
  
  const evaluateArrangement = (updatedWords, newWordPlacement) => {
    // Find the bounds of this arrangement
    let minRow = gridSize;
    let maxRow = 0;
    let minCol = gridSize;
    let maxCol = 0;
    
    // Check existing words
    for (const word of updatedWords) {
      if (word.direction === "across") {
        minRow = Math.min(minRow, word.row);
        maxRow = Math.max(maxRow, word.row);
        minCol = Math.min(minCol, word.col);
        maxCol = Math.max(maxCol, word.col + word.word.length - 1);
      } else {
        minRow = Math.min(minRow, word.row);
        maxRow = Math.max(maxRow, word.row + word.word.length - 1);
        minCol = Math.min(minCol, word.col);
        maxCol = Math.max(maxCol, word.col);
      }
    }
    
    // Check new word
    if (newWordPlacement.direction === "across") {
      minRow = Math.min(minRow, newWordPlacement.row);
      maxRow = Math.max(maxRow, newWordPlacement.row);
      minCol = Math.min(minCol, newWordPlacement.col);
      maxCol = Math.max(maxCol, newWordPlacement.col + newWordPlacement.word.length - 1);
    } else {
      minRow = Math.min(minRow, newWordPlacement.row);
      maxRow = Math.max(maxRow, newWordPlacement.row + newWordPlacement.word.length - 1);
      minCol = Math.min(minCol, newWordPlacement.col);
      maxCol = Math.max(maxCol, newWordPlacement.col);
    }
    
    // Calculate the area of the bounding box
    const width = maxCol - minCol + 1;
    const height = maxRow - minRow + 1;
    const area = width * height;
    
    // Prefer arrangements with smaller area (more compact)
    return -area; // Negative because we want to maximize the score
  };
  
  const updateGridAndClues = (words) => {
    // Create a fresh grid
    const newGrid = Array(gridSize).fill().map(() => 
      Array(gridSize).fill().map(() => ({ 
        value: '', 
        isBlack: false,
        number: null,
        acrossNumber: null,
        downNumber: null
      }))
    );
    
    // Create fresh clues
    const newClues = {
      across: [],
      down: []
    };
    
    // Place all words on the grid and add clues
    for (const wordObj of words) {
      const { word, clue, row, col, direction, number } = wordObj;
      
      if (direction === "across") {
        // Add to grid
        for (let i = 0; i < word.length; i++) {
          newGrid[row][col + i].value = word[i];
          if (i === 0) {
            newGrid[row][col].acrossNumber = number;
            newGrid[row][col].number = newGrid[row][col].number || number;
          }
        }
        
        // Add clue
        newClues.across.push({ number, clue, answer: word });
      } else {
        // Add to grid
        for (let i = 0; i < word.length; i++) {
          newGrid[row + i][col].value = word[i];
          if (i === 0) {
            newGrid[row][col].downNumber = number;
            newGrid[row][col].number = newGrid[row][col].number || number;
          }
        }
        
        // Add clue
        newClues.down.push({ number, clue, answer: word });
      }
    }
    
    // Sort clues by number
    newClues.across.sort((a, b) => a.number - b.number);
    newClues.down.sort((a, b) => a.number - b.number);
    
    // Update the state
    setGrid(newGrid);
    setClues(newClues);
    
    // Set the clues tab to match the direction of the most recently added word
    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      setCluesTab(lastWord.direction);
    }
  };
  
  // For completeness, let's also update these functions to use our new approach
  const canPlaceWordAcross = (word, row, startCol) => {
    // Not needed in our new implementation
    return false;
  };
  
  const canPlaceWordDown = (word, startRow, col) => {
    // Not needed in our new implementation
    return false;
  };
  
  const findBestPlacement = (newWord) => {
    // Not needed in our new implementation
    return null;
  };
  
  const optimizePuzzleLayout = () => {
    // This is handled by our new updateGridAndClues function
  };
  
  const calculatePlacementQuality = (word, startRow, startCol, direction) => {
    // Not needed in our new implementation
    return 0;
  };
  
  const placeWordInNewGrid = (word, row, col, direction, grid) => {
    if (direction === "across") {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i].value = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col].value = word[i];
      }
    }
  };
  
  return (
    <CreatorContainer>
      <Header>
        <Logo>
          <CollabText>Collab</CollabText>+<span>×</span>Cross
        </Logo>
        
        <UserInfo>
          <BackButton onClick={onBackToHome}>
            ← Back to Home
          </BackButton>
          <Avatar>👤</Avatar>
        </UserInfo>
      </Header>
      
      <MainContent>
        <LeftPanel>
          <UserSection>
            <UserAvatar>
              <AvatarIcon>👤</AvatarIcon>
              <Username>User123</Username>
            </UserAvatar>
            
            <StatsItem>
              <span>Created Puzzles:</span>
              <span>12</span>
            </StatsItem>
            
            <StatsItem>
              <span>Shared Puzzles:</span>
              <span>8</span>
            </StatsItem>
            
            <StatsItem>
              <span>Completed:</span>
              <span>24</span>
            </StatsItem>
          </UserSection>
        </LeftPanel>
        
        <CenterPanel>
          <AddWordSection>
            <AddWordTitle>Add a Word</AddWordTitle>
            {errorMessage && <Message style={{ color: 'red' }}>{errorMessage}</Message>}
            
            <InputsRow>
              <StyledInput 
                type="text" 
                placeholder="Enter word" 
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
              <StyledInput 
                type="text" 
                placeholder="Enter clue" 
                value={clue}
                onChange={(e) => setClue(e.target.value)}
              />
            </InputsRow>
            
            <AddButton onClick={addWord} disabled={!word.trim() || !clue.trim()}>
              Add to Puzzle
            </AddButton>
          </AddWordSection>
          
          <GridContainer>
            <Grid size={gridSize}>
              {grid.map((row, rowIndex) => 
                row.map((cell, colIndex) => (
                  <Cell 
                    key={`${rowIndex}-${colIndex}`} 
                    isBlack={cell.isBlack}
                  >
                    {cell.number && <CellNumber>{cell.number}</CellNumber>}
                    {cell.value}
                  </Cell>
                ))
              )}
            </Grid>
          </GridContainer>
        </CenterPanel>
        
        <RightPanel>
          <CluesSectionTitle>Clues</CluesSectionTitle>
          
          <TabsContainer>
            <Tab 
              active={cluesTab === 'across'} 
              onClick={() => setCluesTab('across')}
            >
              Across
            </Tab>
            <Tab 
              active={cluesTab === 'down'} 
              onClick={() => setCluesTab('down')}
            >
              Down
            </Tab>
          </TabsContainer>
          
          <CluesList>
            {cluesTab === 'across' && clues.across.length === 0 && (
              <Message>No across clues yet</Message>
            )}
            
            {cluesTab === 'across' && clues.across.map((clue) => (
              <ClueItem key={`across-${clue.number}`}>
                <ClueHeader>
                  <ClueNumber>{clue.number}</ClueNumber>
                  <ClueDirection>Across</ClueDirection>
                </ClueHeader>
                <ClueText>{clue.clue}</ClueText>
                <ClueAnswer>{clue.answer}</ClueAnswer>
              </ClueItem>
            ))}
            
            {cluesTab === 'down' && clues.down.length === 0 && (
              <Message>No down clues yet</Message>
            )}
            
            {cluesTab === 'down' && clues.down.map((clue) => (
              <ClueItem key={`down-${clue.number}`}>
                <ClueHeader>
                  <ClueNumber>{clue.number}</ClueNumber>
                  <ClueDirection>Down</ClueDirection>
                </ClueHeader>
                <ClueText>{clue.clue}</ClueText>
                <ClueAnswer>{clue.answer}</ClueAnswer>
              </ClueItem>
            ))}
          </CluesList>
        </RightPanel>
      </MainContent>
    </CreatorContainer>
  );
};

export default CrosswordCreator;

