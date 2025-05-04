import { useState } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  transform: scale(1.2); /* Moderate size increase */
  transform-origin: center center;
  margin: 10px 0 60px 0; /* Reduced top margin to move grid upward */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 35px);
  grid-template-rows: repeat(${props => props.size}, 35px);
  gap: 1px;
  border: 2px solid #444;
  background-color: #444;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  padding: 2px; /* Add slight padding around grid */
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isBlack ? darkTheme.background.primary : darkTheme.background.elevated};
  color: ${props => props.isBlack ? darkTheme.text.primary : darkTheme.text.primary};
  font-size: 18px; /* Reduced from 20px to 18px */
  font-weight: bold;
  position: relative;
  user-select: none;
  cursor: ${props => props.isBlack ? 'default' : 'pointer'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.isBlack ? darkTheme.background.primary : darkTheme.brand.primary};
  }
  
  &.selected {
    background-color: ${darkTheme.brand.primary};
    color: ${darkTheme.text.primary};
  }

  &.highlighted {
    background-color: ${darkTheme.background.tertiary};
  }
`;

const CellNumber = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 12px; /* Increased from 10px to 12px */
  font-weight: normal;
  color: ${darkTheme.text.tertiary};
`;

// Remove the mock numbers
// const cellNumbers = {
//   '0-0': 1, '0-5': 5, '0-9': 8,
//   '1-0': 13, '1-5': 14, '1-9': 16,
//   '2-0': 17, '2-5': 18, '3-0': 19,
//   '4-5': 20, '5-5': 23, '6-5': 24,
//   '7-5': 25, '8-5': 28, '9-5': 29,
//   '10-5': 31
// };

const CrosswordGrid = ({ grid, onCellClick, focusedClue }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [direction, setDirection] = useState('across'); // 'across' or 'down'

  const handleCellClick = (row, col) => {
    if (grid[row][col].isBlack) return;
    
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      // Toggle direction if clicking the same cell
      setDirection(prev => prev === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell({ row, col });
    }
    
    onCellClick(row, col);
  };

  const isInSelectedWord = (row, col) => {
    if (!selectedCell || grid[row][col].isBlack) return false;

    if (direction === 'across') {
      if (row === selectedCell.row) {
        // Find start of word
        let startCol = selectedCell.col;
        while (startCol > 0 && !grid[row][startCol - 1].isBlack) {
          startCol--;
        }
        
        // Find end of word
        let endCol = selectedCell.col;
        while (endCol < grid[0].length - 1 && !grid[row][endCol + 1].isBlack) {
          endCol++;
        }
        
        return col >= startCol && col <= endCol;
      }
    } else { // direction === 'down'
      if (col === selectedCell.col) {
        // Find start of word
        let startRow = selectedCell.row;
        while (startRow > 0 && !grid[startRow - 1][col].isBlack) {
          startRow--;
        }
        
        // Find end of word
        let endRow = selectedCell.row;
        while (endRow < grid.length - 1 && !grid[endRow + 1][col].isBlack) {
          endRow++;
        }
        
        return row >= startRow && row <= endRow;
      }
    }
    
    return false;
  };

  // Ensure grid rendering reflects the exact black square pattern and numbering
  return (
    <GridContainer>
      <Grid size={grid.length}>
        {grid.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <Cell 
              key={`${rowIndex}-${colIndex}`}
              isBlack={cell.isBlack}
              className={`
                ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}
                ${isInSelectedWord(rowIndex, colIndex) ? 'highlighted' : ''}
              `}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.number && <CellNumber>{cell.number}</CellNumber>}
              {cell.value}
            </Cell>
          ))
        )}
      </Grid>
    </GridContainer>
  );
};

export default CrosswordGrid; 