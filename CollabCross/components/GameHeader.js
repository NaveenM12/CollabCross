import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${darkTheme.background.secondary};
  padding: 10px 15px;
  border-bottom: 1px solid ${darkTheme.border.primary};
  width: 100%;
`;

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${darkTheme.brand.primary};
`;

const StatsContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${darkTheme.text.tertiary};
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  background-color: ${darkTheme.background.elevated};
  color: ${darkTheme.text.primary};
  padding: 5px 10px;
  border-radius: 4px;
  min-width: 60px;
  text-align: center;
`;

const PuzzleRating = styled(StatValue)`
  background-color: ${props => props.rating >= 1000 ? '#5cb85c' : '#f0ad4e'};
  color: white;
`;

const ProfileIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #3366cc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HomeButton = styled.button`
  background: none;
  border: none;
  color: ${darkTheme.text.primary};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${darkTheme.brand.primary};
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
`;

const GameHeader = ({ puzzleStats, onBackToHome }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo>
          Collab<span style={{ color: '#999' }}>+</span>Cross
        </Logo>
      </LogoContainer>

      <StatsContainer>
        <StatItem>
          <StatLabel>Avg Time</StatLabel>
          <StatValue>{puzzleStats.avgTime}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Your Time</StatLabel>
          <StatValue>{puzzleStats.yourTime}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Puzzle Rating</StatLabel>
          <PuzzleRating rating={parseInt(puzzleStats.rating)}>{puzzleStats.rating}</PuzzleRating>
        </StatItem>
      </StatsContainer>

      <RightSection>
        <HomeButton onClick={onBackToHome}>
          🏠
        </HomeButton>
        <ProfileIcon>
          <span style={{ color: 'white' }}>👤</span>
        </ProfileIcon>
      </RightSection>
    </HeaderContainer>
  );
};

export default GameHeader; 