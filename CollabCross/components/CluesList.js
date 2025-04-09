import { useState } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const CluesContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${darkTheme.background.secondary};
  border-radius: 8px;
`;

const CluesHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TabButton = styled.button`
  flex: 1;
  background-color: ${props => props.active ? darkTheme.background.elevated : darkTheme.background.secondary};
  color: ${darkTheme.text.primary};
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
`;

const ClueItem = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid ${darkTheme.border.primary};
  display: flex;
  align-items: baseline;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${darkTheme.background.tertiary};
  }
  
  &.active {
    background-color: ${darkTheme.brand.primary};
  }
`;

const ClueNumber = styled.span`
  font-weight: bold;
  width: 30px;
  min-width: 30px;
  color: ${darkTheme.text.tertiary};
`;

const ClueText = styled.span`
  color: ${darkTheme.text.primary};
`;

const CluesList = ({ clues }) => {
  const [activeTab, setActiveTab] = useState('across');
  const [activeClue, setActiveClue] = useState(null);

  const handleClueClick = (direction, number) => {
    setActiveClue({ direction, number });
    // In a real implementation, this would also focus the corresponding cell in the grid
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
        {clues[activeTab].map(clue => (
          <ClueItem 
            key={clue.number}
            className={activeClue && activeClue.direction === activeTab && activeClue.number === clue.number ? 'active' : ''}
            onClick={() => handleClueClick(activeTab, clue.number)}
          >
            <ClueNumber>{clue.number}</ClueNumber>
            <ClueText>{clue.clue}</ClueText>
          </ClueItem>
        ))}
      </CluesListContainer>
    </CluesContainer>
  );
};

export default CluesList; 