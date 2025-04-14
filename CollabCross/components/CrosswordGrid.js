import { useState } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 30px);
  grid-template-rows: repeat(15, 30px);
  gap: 1px;
  border: 2px solid #444;
  background-color: #444;
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isBlack ? darkTheme.background.primary : darkTheme.background.elevated};
  color: ${props => props.isBlack ? darkTheme.text.primary : darkTheme.text.primary};
  font-size: 16px;
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
  top: 1px;
  left: 1px;
  font-size: 10px;
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

const CrosswordGrid = ({ grid, onCellClick }) => {
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

  const getClassName = (row, col) => {
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      return 'selected';
    }
    if (selectedCell && isInSelectedWord(row, col)) {
      return 'highlighted';
    }
    return '';
  };

  return (
    <GridContainer>
      <Grid>
        {grid.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isBlack={cell.isBlack}
              className={getClassName(rowIndex, colIndex)}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.number && (
                <CellNumber>{cell.number}</CellNumber>
              )}
              {cell.value}
            </Cell>
          ))
        )}
      </Grid>
    </GridContainer>
  );
};

export default CrosswordGrid; 