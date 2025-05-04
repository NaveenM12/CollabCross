import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const CluesContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${darkTheme.background.secondary};
  border-radius: 8px;
  padding: 15px;
`;

const CluesHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TabButton = styled.button`
  flex: 1;
  background-color: ${props => props.active ? darkTheme.background.elevated : darkTheme.background.secondary};
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${darkTheme.background.elevated};
  }
  
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const CluesListContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${darkTheme.background.secondary};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${darkTheme.border.primary};
    border-radius: 3px;
  }
`;

const ClueItem = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid ${darkTheme.border.primary};
  display: flex;
  align-items: baseline;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.isFocused ? darkTheme.background.tertiary : 'transparent'};
  border-left: 3px solid ${props => props.isFocused ? darkTheme.brand.primary : 'transparent'};
  
  &:hover {
    background-color: ${darkTheme.background.tertiary};
  }
`;

const ClueNumber = styled.span`
  font-weight: bold;
  width: 30px;
  min-width: 30px;
  color: #ffffff;
`;

const ClueText = styled.span`
  color: #ffffff;
  font-weight: ${props => props.isFocused ? 'bold' : 'normal'};
`;

const CluesList = ({ clues, focusedClue, onClueSelected }) => {
  const [activeTab, setActiveTab] = useState('across');
  const focusedRef = useRef(null);
  
  // Extract direction and number from focusedClue (e.g., "5-Across")
  const parseFocusedClue = (focusedClue) => {
    if (!focusedClue) return { number: null, direction: null };
    
    const parts = focusedClue.split('-');
    if (parts.length !== 2) return { number: null, direction: null };
    
    const number = parseInt(parts[0], 10);
    const direction = parts[1].toLowerCase();
    
    return { number, direction };
  };
  
  const { direction, number } = parseFocusedClue(focusedClue);
  
  // Update activeTab when focusedClue changes
  useEffect(() => {
    if (direction === 'across' || direction === 'down') {
      setActiveTab(direction);
    }
  }, [direction]);
  
  // Scroll focused clue into view
  useEffect(() => {
    if (focusedRef.current) {
      focusedRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [focusedClue]);

  const handleClueClick = (direction, number) => {
    // Format clue identifier (e.g., "5-Across")
    const formattedDirection = direction.charAt(0).toUpperCase() + direction.slice(1);
    const clueIdentifier = `${number}-${formattedDirection}`;
    
    // Notify parent component
    if (onClueSelected) {
      onClueSelected(clueIdentifier);
    }
  };

  // Check if a clue is the focused one
  const isFocusedClue = (clueDirection, clueNumber) => {
    return direction === clueDirection && number === clueNumber;
  };

  return (
    <CluesContainer>
      <CluesHeader>
        <TabButton 
          active={activeTab === 'across'} 
          onClick={() => setActiveTab('across')}
        >
          ACROSS
        </TabButton>
        <TabButton 
          active={activeTab === 'down'} 
          onClick={() => setActiveTab('down')}
        >
          DOWN
        </TabButton>
      </CluesHeader>

      <CluesListContainer>
        {clues[activeTab].map(clue => {
          const isFocused = isFocusedClue(activeTab, clue.number);
          
          return (
            <ClueItem 
              key={clue.number}
              isFocused={isFocused}
              onClick={() => handleClueClick(activeTab, clue.number)}
              ref={isFocused ? focusedRef : null}
            >
              <ClueNumber isFocused={isFocused}>{clue.number}</ClueNumber>
              <ClueText isFocused={isFocused}>{clue.clue}</ClueText>
            </ClueItem>
          );
        })}
      </CluesListContainer>
    </CluesContainer>
  );
};

export default CluesList; 