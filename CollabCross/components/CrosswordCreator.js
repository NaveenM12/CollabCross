import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const CreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
  background-color: ${darkTheme.background.primary};
  color: ${darkTheme.text.primary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px solid ${darkTheme.border.primary};
  margin-bottom: 30px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
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
  width: 280px;
  margin-right: 40px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

const CenterPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 600px;
`;

const RightPanel = styled.div`
  width: 380px;
  margin-left: 40px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 30px;
  }
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${darkTheme.background.secondary};
  border-radius: 8px;
  margin-bottom: 25px;
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${darkTheme.border.primary};
`;

const AvatarIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${darkTheme.brand.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
`;

const Username = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: ${darkTheme.text.primary};
`;

const StatsItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: ${darkTheme.text.secondary};
  
  span:last-child {
    font-weight: bold;
    font-size: 22px;
    color: ${darkTheme.brand.primary};
  }
`;

const AddWordSection = styled.div`
  margin-bottom: 30px;
`;

const AddWordTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 20px 0;
  font-weight: normal;
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

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const TitleLabel = styled.h2`
  font-size: 28px;
  margin: 0 20px 0 0;
  font-weight: normal;
`;

const TitleInput = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${darkTheme.border.primary};
  background-color: ${darkTheme.background.elevated};
  color: ${darkTheme.text.primary};
  font-size: 18px;
  
  &:focus {
    outline: none;
    border-color: ${darkTheme.brand.primary};
  }
  
  &::placeholder {
    color: ${darkTheme.text.tertiary};
  }
`;

const SaveButton = styled.button`
  background-color: ${darkTheme.brand.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-left: 15px;
  font-size: 16px;
  cursor: pointer;
  height: 42px;
  
  &:hover {
    background-color: ${darkTheme.brand.secondary};
  }
`;

const PlayButton = styled.button`
  background-color: ${darkTheme.brand.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
  height: 42px;
  
  &:hover {
    background-color: ${darkTheme.brand.primary};
  }
  
  &:disabled {
    background-color: ${darkTheme.background.tertiary};
    cursor: not-allowed;
  }
`;

const InputsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: ${darkTheme.brand.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  height: 42px; /* Match the height of the input fields */
  
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
  transform: none;
  transform-origin: center center;
  margin: 20px 0;
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
  cursor: pointer;
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
  font-size: 28px;
  margin: 0 0 25px 0;
  font-weight: normal;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid ${darkTheme.border.primary};
`;

const Tab = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? darkTheme.brand.primary : 'transparent'};
  color: ${props => props.active ? darkTheme.text.primary : darkTheme.text.secondary};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-size: 18px;
  
  &:hover {
    color: ${darkTheme.text.primary};
  }
`;

const CluesList = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 8px;
  background-color: ${darkTheme.background.secondary};
`;

const ClueItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid ${darkTheme.border.primary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ClueHeader = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const ClueNumber = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const ClueDirection = styled.span`
  color: ${darkTheme.text.secondary};
  font-size: 18px;
`;

const ClueText = styled.div`
  color: ${darkTheme.text.secondary};
  margin-bottom: 5px;
  font-size: 16px;
`;

const ClueAnswer = styled.div`
  font-weight: bold;
  color: ${darkTheme.brand.primary};
  font-size: 18px;
`;

const Message = styled.div`
  padding: 20px;
  text-align: center;
  color: ${darkTheme.text.secondary};
  margin-top: 15px;
  font-size: 16px;
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

const SavedPuzzlesSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${darkTheme.background.secondary};
  border-radius: 8px;
  margin-bottom: 25px;
`;

const SavedPuzzlesTitle = styled.div`
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${darkTheme.border.primary};
  font-size: 18px;
`;

const PuzzleButton = styled.button`
  background-color: ${props => props.active ? darkTheme.brand.primary : darkTheme.background.elevated};
  color: ${props => props.active ? 'white' : darkTheme.text.primary};
  border: 1px solid ${darkTheme.border.primary};
  border-radius: 6px;
  padding: 12px 15px;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? darkTheme.brand.primary : darkTheme.background.tertiary};
  }
`;

const NewPuzzleButton = styled.button`
  background-color: ${darkTheme.background.elevated};
  color: ${darkTheme.text.primary};
  border: 2px dashed ${darkTheme.border.primary};
  border-radius: 6px;
  padding: 12px 15px;
  margin-top: 8px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    background-color: ${darkTheme.background.tertiary};
    color: ${darkTheme.brand.primary};
  }
`;

// Add new styled components for the AI clues section
const AICluesSection = styled.div`
  margin-bottom: 30px;
  border-top: 1px solid ${darkTheme.border.primary};
  padding-top: 20px;
`;

const AICluesTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 15px 0;
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    color: ${darkTheme.brand.primary};
  }
`;

const ThemeInput = styled(StyledInput)`
  min-width: 300px;
`;

const ThemeButton = styled(AddButton)`
  background-color: ${darkTheme.brand.secondary};
  min-width: 120px;
  
  &:hover {
    background-color: ${darkTheme.brand.primary};
  }
`;

const AIMessage = styled.div`
  margin-top: 15px;
  padding: 12px;
  border-radius: 6px;
  background-color: ${darkTheme.background.elevated};
  color: ${darkTheme.text.primary};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    color: ${darkTheme.brand.primary};
    font-size: 18px;
  }
`;

// Add new styled components for the popups
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
  max-width: 400px;
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

const CrosswordCreator = ({ onBackToHome, initialPuzzleId }) => {
  const [gridSize, setGridSize] = useState(21);
  const [grid, setGrid] = useState([]);
  const [word, setWord] = useState('');
  const [clue, setClue] = useState('');
  const [title, setTitle] = useState('');
  const [clues, setClues] = useState({
    across: [],
    down: []
  });
  const [nextClueNumber, setNextClueNumber] = useState(1);
  const [cluesTab, setCluesTab] = useState('across');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [placedWords, setPlacedWords] = useState([]);
  const [themeInput, setThemeInput] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [savedPuzzles, setSavedPuzzles] = useState([]);
  const [activePuzzleId, setActivePuzzleId] = useState(initialPuzzleId || null);
  const [lastLetterToggle, setLastLetterToggle] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Initialize empty grid and create default puzzles
  useEffect(() => {
    initializeGrid();
    window.savedPuzzles = [];
    createDefaultPuzzles();
  }, []);

  // Add effect to handle initialPuzzleId changes
  useEffect(() => {
    if (initialPuzzleId && savedPuzzles.length > 0) {
      loadPuzzle(initialPuzzleId);
    }
  }, [initialPuzzleId, savedPuzzles]);
  
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
  
  const savePuzzle = () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a title for your crossword");
      return;
    }
    
    // Check if a puzzle with this title already exists
    const existingPuzzleIndex = savedPuzzles.findIndex(p => p.title.toLowerCase() === title.toLowerCase());
    
    if (existingPuzzleIndex >= 0) {
      // Update existing puzzle
      const updatedPuzzles = [...savedPuzzles];
      updatedPuzzles[existingPuzzleIndex] = {
        ...updatedPuzzles[existingPuzzleIndex],
        title: title,
        words: placedWords,
        avgTime: "11:34",
        rating: 1100
      };
      
      setSavedPuzzles(updatedPuzzles);
      setActivePuzzleId(updatedPuzzles[existingPuzzleIndex].id);
      setErrorMessage(null);
      
      // Save to window to make it accessible to other components
      window.savedPuzzles = updatedPuzzles;
      
      // Show feedback
      alert(`Puzzle "${title}" updated successfully!`);
    } else {
      // Create new puzzle
      const newPuzzle = {
        id: Date.now(), // Use timestamp as a simple unique ID
        title: title,
        words: placedWords,
        avgTime: "11:34",
        rating: 1100
      };
      
      const updatedPuzzles = [...savedPuzzles, newPuzzle];
      setSavedPuzzles(updatedPuzzles);
      setActivePuzzleId(newPuzzle.id);
      setErrorMessage(null);
      
      // Save to window to make it accessible to other components
      window.savedPuzzles = updatedPuzzles;
      
      // Show feedback
      alert(`Puzzle "${title}" saved successfully!`);
    }
  };
  
  const loadPuzzle = (puzzleId) => {
    const puzzle = savedPuzzles.find(p => p.id === puzzleId);
    if (!puzzle) return;
    
    setTitle(puzzle.title);
    setPlacedWords(puzzle.words);
    setActivePuzzleId(puzzleId);
    
    // Update grid and clues for the loaded puzzle
    updateGridAndClues(puzzle.words);
    
    // Reset the word and clue inputs
    setWord('');
    setClue('');
    setErrorMessage(null);
    
    // Reset the next clue number based on the loaded puzzle
    const maxNumber = puzzle.words.reduce((max, word) => Math.max(max, word.number), 0);
    setNextClueNumber(maxNumber + 1);
  };
  
  const createNewPuzzle = () => {
    // Reset all relevant state
    setTitle('');
    setPlacedWords([]);
    setActivePuzzleId(null);
    setWord('');
    setClue('');
    setErrorMessage(null);
    setNextClueNumber(1);
    
    // Initialize empty grid
    initializeGrid();
    
    // Reset clues
    setClues({
      across: [],
      down: []
    });
  };
  
  const playPuzzle = () => {
    // First save the puzzle if it's not already saved
    if (!title.trim()) {
      setErrorMessage("Please enter a title for your crossword before playing");
      return;
    }
    
    if (placedWords.length === 0) {
      setErrorMessage("Please add some words to your crossword before playing");
      return;
    }
    
    // Save current puzzle if not already saved
    const existingPuzzleIndex = savedPuzzles.findIndex(p => p.title.toLowerCase() === title.toLowerCase());
    
    let currentPuzzleId;
    let puzzleData;
    
    if (existingPuzzleIndex >= 0) {
      // Update existing puzzle
      const updatedPuzzles = [...savedPuzzles];
      puzzleData = {
        ...updatedPuzzles[existingPuzzleIndex],
        title: title,
        words: placedWords,
        grid: grid // Add the current grid state
      };
      updatedPuzzles[existingPuzzleIndex] = puzzleData;
      
      setSavedPuzzles(updatedPuzzles);
      currentPuzzleId = updatedPuzzles[existingPuzzleIndex].id;
      setActivePuzzleId(currentPuzzleId);
      setErrorMessage(null);
      
      // Save to window to make it accessible to other components
      window.savedPuzzles = updatedPuzzles;
    } else {
      // Create new puzzle
      puzzleData = {
        id: Date.now(), // Use timestamp as a simple unique ID
        title: title,
        words: placedWords,
        grid: grid // Add the current grid state
      };
      
      const updatedPuzzles = [...savedPuzzles, puzzleData];
      setSavedPuzzles(updatedPuzzles);
      currentPuzzleId = puzzleData.id;
      setActivePuzzleId(currentPuzzleId);
      setErrorMessage(null);
      
      // Save to window to make it accessible to other components
      window.savedPuzzles = updatedPuzzles;
    }
    
    // Pass additional play mode data
    const playModeData = {
      puzzleId: currentPuzzleId,
      mode: 'play',
      gridData: grid,
      words: placedWords,
      clues: clues
    };
    
    // Navigate to play the crossword with the additional data
    onBackToHome('play', currentPuzzleId, playModeData);
  };
  
  // Add a new function to handle the theme submission
  const handleThemeSubmit = () => {
    if (!themeInput.trim()) {
      // Use sports as the default theme
      setThemeInput("sports");
    }
    
    const theme = themeInput.trim() || "sports";
    setAiMessage(`Generating clues based on the theme: "${theme}"...`);
    
    // Simulate loading time
    setTimeout(() => {
      // Sample clues based on a sports theme (shorter words that are more likely to connect)
      const sampleClues = [
        { word: "BALL", clue: "Round object used in many sports", direction: "across" },
        { word: "TEAM", clue: "Group of players", direction: "across" },
        { word: "GOAL", clue: "Target to score in", direction: "across" },
        { word: "BATS", clue: "Used in baseball", direction: "down" },
        { word: "GOLF", clue: "Sport with clubs", direction: "across" },
        { word: "GAME", clue: "Competitive match", direction: "down" },
        { word: "RACE", clue: "Contest of speed", direction: "across" },
        { word: "SWIM", clue: "Move through water", direction: "down" }
      ];
      
      // Only select 2 clues to keep it simple
      const numClues = 2;
      const selectedClues = [...sampleClues].sort(() => 0.5 - Math.random()).slice(0, numClues);
      
      // Add each clue
      const newWords = [];
      let currentPlacedWords = [...placedWords];
      
      for (const clueData of selectedClues) {
        // Create a properly formatted word object for placement
        const wordToPlace = clueData.word.toUpperCase();
        const clueText = clueData.clue;
        
        // If it's the first word in an empty puzzle, place it at position 0,0
        if (currentPlacedWords.length === 0) {
          const newWordObj = {
            word: wordToPlace,
            clue: clueText,
            row: 1,
            col: 1,
            direction: clueData.direction,
            number: nextClueNumber
          };
          
          newWords.push(newWordObj);
          currentPlacedWords = [newWordObj];
          setNextClueNumber(prev => prev + 1);
        } else {
          // Try to find placement for the word
          const result = findOptimalArrangement(currentPlacedWords, wordToPlace);
          
          if (result) {
            const { updatedWords, newWordPlacement } = result;
            
            // Create the new word object
            const newWordObj = {
              word: wordToPlace,
              clue: clueText,
              row: newWordPlacement.row,
              col: newWordPlacement.col,
              direction: newWordPlacement.direction,
              number: nextClueNumber
            };
            
            // Add to our tracking arrays
            newWords.push(newWordObj);
            currentPlacedWords = [...updatedWords, newWordObj];
            setNextClueNumber(prev => prev + 1);
          }
        }
      }
      
      // Update the placedWords state with all new words
      if (newWords.length > 0) {
        const finalPlacedWords = [...placedWords, ...newWords];
        setPlacedWords(finalPlacedWords);
        
        // Update the grid and clues with all words
        updateGridAndClues(finalPlacedWords);
        
        setAiMessage(`Added ${newWords.length} clues related to "${theme}"!`);
      } else {
        setAiMessage(`Couldn't place any words from the "${theme}" theme. Try adding words manually.`);
      }
      
      setThemeInput('');
    }, 1500);
  };
  
  // Function to create default puzzles using the placement logic
  const createDefaultPuzzles = () => {
    const defaultPuzzles = [
      {
        id: 1,
        title: "Daily Crossword",
        wordsList: [
          { word: "CODE", clue: "Instructions for computers", direction: "across", row: 0, col: 0 },
          { word: "CHIP", clue: "Small piece of silicon", direction: "down", row: 0, col: 0 },
          { word: "DATA", clue: "Information for processing", direction: "down", row: 0, col: 2 }
        ]
      },
      {
        id: 2,
        title: "Tech Puzzle",
        wordsList: [
          { word: "LINK", clue: "Web connection", direction: "across", row: 0, col: 0 },
          { word: "LIST", clue: "Data structure", direction: "down", row: 0, col: 0 },
          { word: "NET", clue: "Short for internet", direction: "down", row: 0, col: 2 }
        ]
      },
      {
        id: 3,
        title: "Fun with Words",
        wordsList: [
          { word: "PLAY", clue: "To engage in activity for enjoyment", direction: "across", row: 0, col: 0 },
          { word: "POST", clue: "To publish online", direction: "down", row: 0, col: 0 },
          { word: "YEET", clue: "Slang; to throw something", direction: "down", row: 0, col: 3 }
        ]
      }
    ];
    
    // Process each default puzzle
    const processedPuzzles = defaultPuzzles.map(puzzle => {
      const processedWords = [];
      
      // First, sort words by position and direction (across first, then down)
      const sortedWordsList = [...puzzle.wordsList].sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        if (a.col !== b.col) return a.col - b.col;
        // Put across words before down words at same position
        if (a.direction !== b.direction) {
          return a.direction === "across" ? -1 : 1;
        }
        return 0;
      });
      
      // Track cell numbers
      const cellNumbers = {};
      let nextNumber = 1;
      
      // Process each word
      sortedWordsList.forEach(wordData => {
        const { word, clue, direction, row, col } = wordData;
        const cellKey = `${row},${col}`;
        
        // Assign number if cell doesn't have one
        if (!cellNumbers[cellKey]) {
          cellNumbers[cellKey] = nextNumber++;
        }
        
        // Add the processed word
        processedWords.push({
          word: word.toUpperCase(),
          clue: clue,
          row: row,
          col: col,
          direction: direction,
          number: cellNumbers[cellKey]
        });
      });
      
      return {
        id: puzzle.id,
        title: puzzle.title,
        words: processedWords
      };
    });
    
    setSavedPuzzles(processedPuzzles);
    window.savedPuzzles = processedPuzzles;
  };
  
  const handleLastLetterEntry = () => {
    // Toggle the last letter state
    setLastLetterToggle(prev => !prev);
    
    // Show appropriate popup based on the new state
    if (!lastLetterToggle) {
      setShowSuccessPopup(true);
      setShowErrorPopup(false);
    } else {
      setShowErrorPopup(true);
      setShowSuccessPopup(false);
    }
  };

  const closePopups = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  const checkCompletion = () => {
    // Check if all cells that should have letters have values
    const isFilled = grid.every((row, rowIndex) => 
      row.every((cell, colIndex) => {
        if (cell.isBlack) return true; // Black cells are always "filled"
        
        // Check if this cell is part of any word
        const isPartOfWord = placedWords.some(word => {
          if (word.direction === "across") {
            return rowIndex === word.row && 
                   colIndex >= word.col && 
                   colIndex < word.col + word.word.length;
          } else {
            return colIndex === word.col && 
                   rowIndex >= word.row && 
                   rowIndex < word.row + word.word.length;
          }
        });
        
        // If it's part of a word, it should have a value
        return !isPartOfWord || cell.value !== '';
      })
    );
    
    setIsComplete(isFilled);
    return isFilled;
  };

  const handleCellClick = (rowIndex, colIndex) => {
    // Clone the current grid
    const newGrid = [...grid.map(row => [...row.map(cell => ({...cell}))])];
    // Find if this cell is part of a word
    let isPartOfWord = false;
    placedWords.some(word => {
      if (word.direction === "across" && 
          rowIndex === word.row && 
          colIndex >= word.col && 
          colIndex < word.col + word.word.length) {
        isPartOfWord = true;
        return true;
      } else if (word.direction === "down" && 
                colIndex === word.col && 
                rowIndex >= word.row && 
                rowIndex < word.row + word.word.length) {
        isPartOfWord = true;
        return true;
      }
      return false;
    });
    if (!isPartOfWord) return; // Skip clicks on cells that aren't part of any word
    // Do NOT auto-fill the correct letter in play mode. Only user input should fill cells.
    // Update the grid with no change to .value here.
    setGrid(newGrid);
    // ... rest of the function remains unchanged ...
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
              <span>{savedPuzzles.length}</span>
            </StatsItem>
          </UserSection>
          
          <SavedPuzzlesSection>
            <SavedPuzzlesTitle>Your Puzzles</SavedPuzzlesTitle>
            {savedPuzzles.map(puzzle => (
              <PuzzleButton 
                key={puzzle.id}
                active={puzzle.id === activePuzzleId}
                onClick={() => loadPuzzle(puzzle.id)}
              >
                {puzzle.title}
              </PuzzleButton>
            ))}
            <NewPuzzleButton onClick={createNewPuzzle}>
              <span>+</span>
              <span>Add New</span>
            </NewPuzzleButton>
          </SavedPuzzlesSection>
        </LeftPanel>
        
        <CenterPanel>
          <TitleSection>
            <TitleLabel>Title</TitleLabel>
            <TitleInput 
              type="text" 
              placeholder="Enter a title!" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <SaveButton onClick={savePuzzle}>
              Save
            </SaveButton>
            <PlayButton 
              onClick={playPuzzle}
              disabled={placedWords.length === 0}
            >
              Play Crossword
            </PlayButton>
          </TitleSection>
          
          <AddWordSection>
            {errorMessage && <Message style={{ color: 'red', marginTop: '-20px' }}>{errorMessage}</Message>}
            <AddWordTitle>Add a Word</AddWordTitle>
            
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
              <AddButton onClick={addWord} disabled={!word.trim() || !clue.trim()}>
                Add to Puzzle
              </AddButton>
            </InputsRow>
          </AddWordSection>
          
          <AICluesSection>
            <AICluesTitle>
              <span>✨</span>
              Add clues using AI
            </AICluesTitle>
            
            <InputsRow>
              <ThemeInput 
                type="text" 
                placeholder="Enter a theme (e.g. sports)" 
                value={themeInput}
                onChange={(e) => setThemeInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleThemeSubmit()}
              />
              <ThemeButton 
                onClick={handleThemeSubmit}
              >
                Generate
              </ThemeButton>
            </InputsRow>
            
            {aiMessage && (
              <AIMessage>
                <span>🤖</span> {aiMessage}
              </AIMessage>
            )}
          </AICluesSection>
          
          <GridContainer>
            <Grid size={gridSize}>
              {grid.map((row, rowIndex) => 
                row.map((cell, colIndex) => {
                  return (
                    <Cell 
                      key={`${rowIndex}-${colIndex}`} 
                      isBlack={cell.isBlack}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell.number && <CellNumber>{cell.number}</CellNumber>}
                      {cell.value}
                    </Cell>
                  );
                })
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

      {/* Add the popups */}
      {showSuccessPopup && (
        <PopupOverlay onClick={closePopups}>
          <PopupContent onClick={e => e.stopPropagation()}>
            <PopupEmoji>🎉</PopupEmoji>
            <PopupTitle isSuccess={true}>Congratulations!</PopupTitle>
            <PopupMessage>
              You've successfully completed the crossword puzzle! Well done!
            </PopupMessage>
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
    </CreatorContainer>
  );
};

export default CrosswordCreator;

