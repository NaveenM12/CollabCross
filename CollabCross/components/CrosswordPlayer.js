import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

// ... (include all the necessary styled components) ...

const CrosswordPlayer = ({ puzzleData }) => {
  const [playGrid, setPlayGrid] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [incorrectCells, setIncorrectCells] = useState([]);

  useEffect(() => {
    // Initialize the play grid with empty cells but maintain the structure
    initializePlayGrid();
  }, [puzzleData]);

  const initializePlayGrid = () => {
    const newGrid = puzzleData.gridData.map(row =>
      row.map(cell => ({
        ...cell,
        userValue: '', // Add user input value
        isCorrect: null, // Track if the input is correct
        isRevealed: false // Track if the answer has been revealed
      }))
    );
    setPlayGrid(newGrid);
  };

  const handleCellInput = (rowIndex, colIndex, value) => {
    const newGrid = [...playGrid];
    const cell = newGrid[rowIndex][colIndex];
    
    // Update the user's input
    cell.userValue = value.toUpperCase();
    
    // Check if this was the last empty cell
    const isLastCell = checkIfLastCell();
    
    if (isLastCell) {
      // Check all answers
      const { isAllCorrect, wrongCells } = checkAllAnswers();
      
      if (isAllCorrect) {
        setShowSuccessPopup(true);
        setIsComplete(true);
      } else {
        setIncorrectCells(wrongCells);
        setShowErrorPopup(true);
      }
    }
    
    setPlayGrid(newGrid);
  };

  const checkIfLastCell = () => {
    // Check if this was the last empty cell to be filled
    return playGrid.every(row =>
      row.every(cell => 
        cell.isBlack || cell.userValue || cell.value === ''
      )
    );
  };

  const checkAllAnswers = () => {
    const wrongCells = [];
    let isAllCorrect = true;

    playGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (!cell.isBlack && cell.value) {
          if (cell.userValue !== cell.value) {
            wrongCells.push([rowIndex, colIndex]);
            isAllCorrect = false;
          }
        }
      });
    });

    return { isAllCorrect, wrongCells };
  };

  const closePopups = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  return (
    <PlayContainer>
      {/* ... rest of your UI components ... */}
      
      <Grid>
        {playGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isBlack={cell.isBlack}
              isIncorrect={incorrectCells.some(([r, c]) => r === rowIndex && c === colIndex)}
            >
              {cell.number && <CellNumber>{cell.number}</CellNumber>}
              <input
                type="text"
                maxLength="1"
                value={cell.userValue}
                onChange={(e) => handleCellInput(rowIndex, colIndex, e.target.value)}
                disabled={cell.isBlack || isComplete}
              />
            </Cell>
          ))
        )}
      </Grid>

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
    </PlayContainer>
  );
};

export default CrosswordPlayer; 