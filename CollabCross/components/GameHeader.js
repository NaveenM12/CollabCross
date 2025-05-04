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

const PuzzleTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${darkTheme.text.primary};
  margin-left: 15px;
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
  color: #ffffff;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  background-color: ${darkTheme.background.elevated};
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 4px;
  min-width: 60px;
  text-align: center;
`;

const TimerValue = styled(StatValue)`
  background-color: ${darkTheme.brand.secondary};
  color: white;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(51, 102, 204, 0.4);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(51, 102, 204, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(51, 102, 204, 0);
    }
  }
`;

const PuzzleRating = styled(StatValue)`
  background-color: #ff6b6b; /* Light red background color */
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

const BackButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  
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

const GameHeader = ({ puzzleStats, puzzleTitle = "Daily Crossword", onBackToHome }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo>
          Collab<span style={{ color: '#999' }}>+</span>Cross
        </Logo>
        <PuzzleTitle>
          {puzzleTitle}
        </PuzzleTitle>
      </LogoContainer>

      <StatsContainer>
        <StatItem>
          <StatLabel>Avg Time</StatLabel>
          <StatValue>{puzzleStats.avgTime}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Your Time</StatLabel>
          <TimerValue>{puzzleStats.yourTime}</TimerValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Puzzle Rating</StatLabel>
          <PuzzleRating rating={parseInt(puzzleStats.rating)}>{puzzleStats.rating}</PuzzleRating>
        </StatItem>
      </StatsContainer>

      <RightSection>
        <BackButton onClick={onBackToHome}>
          ← Back to Home
        </BackButton>
        <ProfileIcon>
          <span style={{ color: 'white' }}>👤</span>
        </ProfileIcon>
      </RightSection>
    </HeaderContainer>
  );
};

export default GameHeader; 