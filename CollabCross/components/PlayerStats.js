import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.isCurrentPlayer ? '#2c3e50' : '#333'};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const PlayerIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #1a56ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 18px;
  color: white;
  font-weight: bold;
`;

const PlayerName = styled.div`
  font-weight: bold;
  color: white;
  font-size: 20px;
`;

const StatsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #ccc;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatLabel = styled.span`
  color: #aaa;
`;

const StatValue = styled.span`
  font-weight: bold;
  color: white;
`;

const SquareProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #444;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 12px;
  margin-bottom: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const SquareProgress = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
  background-image: linear-gradient(to right, #4caf50, #8bc34a);
`;

const ProgressLabel = styled.div`
  font-size: 16px;
  color: #ddd;
  text-align: right;
  margin-bottom: 5px;
  font-weight: bold;
`;

const PlayerStats = ({ players, currentPlayer }) => {
  return (
    <StatsContainer>
      <PlayerList>
        {players.map(player => {
          const isCurrentPlayer = player.name === currentPlayer;
          // Calculate filled squares percentage based on total available squares
          const totalSquares = player.estimatedTotalSquares || 80;
          const filledPercentage = Math.min(100, Math.round((player.squaresFilled / totalSquares) * 100));
          
          return (
            <PlayerCard key={player.id} isCurrentPlayer={isCurrentPlayer}>
              <PlayerHeader>
                <PlayerIcon>{player.name.charAt(0)}</PlayerIcon>
                <PlayerName>{player.name}</PlayerName>
              </PlayerHeader>
              
              <StatsRow>
                <StatItem>
                  <StatLabel>Squares Filled:</StatLabel>
                  <StatValue>{player.squaresFilled}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Words Solved:</StatLabel>
                  <StatValue>{player.wordsSolved}</StatValue>
                </StatItem>
              </StatsRow>
              
              <ProgressLabel>Completion: {filledPercentage}%</ProgressLabel>
              <SquareProgressBar>
                <SquareProgress percentage={filledPercentage} />
              </SquareProgressBar>
            </PlayerCard>
          );
        })}
      </PlayerList>
    </StatsContainer>
  );
};

export default PlayerStats; 