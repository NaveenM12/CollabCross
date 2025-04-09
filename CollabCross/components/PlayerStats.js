import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.isCurrentPlayer ? '#2c3e50' : '#333'};
  border-radius: 6px;
  padding: 10px;
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const PlayerIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const PlayerName = styled.div`
  font-weight: bold;
  color: white;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
  color: #aaa;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #444;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${props => props.score > 40 ? '#4caf50' : '#2196f3'};
  width: ${props => props.percentage}%;
`;

const PlayerStats = ({ players, currentPlayer }) => {
  return (
    <StatsContainer>
      <PlayerList>
        {players.map(player => {
          const isCurrentPlayer = player.name === currentPlayer;
          return (
            <PlayerCard key={player.id} isCurrentPlayer={isCurrentPlayer}>
              <PlayerHeader>
                <PlayerIcon>{player.name.charAt(0)}</PlayerIcon>
                <PlayerName>{player.name}</PlayerName>
              </PlayerHeader>
              
              <StatsRow>
                <span>Squares Filled: {player.squaresFilled}</span>
                <span>Words Solved: {player.wordsSolved}</span>
              </StatsRow>
              
              <ProgressBar>
                <Progress percentage={(player.score / 100) * 100} score={player.score} />
              </ProgressBar>
              
              <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '5px' }}>
                {player.score}
              </div>
            </PlayerCard>
          );
        })}
      </PlayerList>
    </StatsContainer>
  );
};

export default PlayerStats; 