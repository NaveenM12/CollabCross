import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { darkTheme } from '../styles/theme';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  color: ${darkTheme.text.primary};
`;

const Logo = styled.div`
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1;
  text-align: center;
`;

const CollabText = styled.span`
  color: ${darkTheme.brand.primary};
`;

const CrossText = styled.span`
  color: ${darkTheme.text.primary};
`;

const TitleText = styled.h1`
  font-size: 28px;
  margin-bottom: 40px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background-color: ${darkTheme.background.secondary};
  border-radius: 8px;
  padding: 20px;
  position: relative;
`;

const PuzzleSelector = styled.div`
  position: relative;
`;

const PuzzleTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const PuzzleDate = styled.div`
  text-align: center;
  margin: 10px 0 30px;
  font-size: 18px;
`;

const ModeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const ModeOption = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${darkTheme.background.tertiary};
  }
`;

const RadioButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${darkTheme.brand.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioButtonInner = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${darkTheme.brand.primary};
`;

const ModeIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a56ff;
  font-size: 24px;
`;

const StartButton = styled.button`
  background-color: ${darkTheme.brand.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${darkTheme.brand.secondary};
  }
  
  &:disabled {
    background-color: ${darkTheme.background.tertiary};
    cursor: not-allowed;
  }
`;

const RightPanel = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const OrDivider = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 15px 0;
`;

const OptionCard = styled.div`
  border: 1px solid ${darkTheme.border.primary};
  border-radius: 8px;
  padding: 15px;
  background-color: ${darkTheme.background.secondary};
`;

const RandomPartnerButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${darkTheme.background.secondary};
  border: 2px solid ${darkTheme.brand.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
  cursor: pointer;
  color: ${darkTheme.brand.primary};
  
  &:hover {
    background-color: ${darkTheme.background.tertiary};
  }
`;

const FriendsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const FriendsTitle = styled.h3`
  font-size: 20px;
  margin: 0;
`;

const AddFriendButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const FriendName = styled.div`
  font-size: 18px;
  flex-grow: 1;
`;

const StatusDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$online ? '#4caf50' : '#f44336'};
`;

const LandingPage = ({ onStartGame }) => {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleStartGame = () => {
    if (selectedMode) {
      onStartGame(selectedMode);
    }
  };

  return (
    <LandingContainer>
      <Logo>
        <CollabText>Collab</CollabText>
        <CrossText>Cross</CrossText>
      </Logo>
      <TitleText>Create and solve crossword puzzles together</TitleText>
      
      <ContentWrapper>
        <LeftPanel>
          <PuzzleSelector>
            <PuzzleTitle>Select Mode</PuzzleTitle>
            <ModeSelector>
              <ModeOption onClick={() => setSelectedMode('solo')}>
                <RadioButton>
                  {selectedMode === 'solo' && <RadioButtonInner />}
                </RadioButton>
                Versus
              </ModeOption>
              <ModeOption onClick={() => setSelectedMode('collab')}>
                <RadioButton>
                  {selectedMode === 'collab' && <RadioButtonInner />}
                </RadioButton>
                Collaborative Play
              </ModeOption>
              <ModeOption onClick={() => setSelectedMode('creator')}>
                <RadioButton>
                  {selectedMode === 'creator' && <RadioButtonInner />}
                </RadioButton>
                Create Puzzle
              </ModeOption>
            </ModeSelector>
            <StartButton onClick={handleStartGame} disabled={!selectedMode}>
              {selectedMode === 'creator' ? 'Start Creating' : 'Start Game'}
            </StartButton>
          </PuzzleSelector>
        </LeftPanel>
        
        <RightPanel>
          <RandomPartnerButton>
            <span>🔍</span>
            Random Partner
          </RandomPartnerButton>
          
          <OrDivider>OR</OrDivider>
          
          <OptionCard>
            <FriendsHeader>
              <FriendsTitle>Friends</FriendsTitle>
              <AddFriendButton>
                <span>➕</span>
              </AddFriendButton>
            </FriendsHeader>
            
            <FriendsList>
              <FriendItem>
                <RadioButton selected={false} />
                <FriendName>Milan_J12</FriendName>
                <StatusDot $online={true} />
              </FriendItem>
              
              <FriendItem>
                <RadioButton selected={true} />
                <FriendName>Jacob_S</FriendName>
                <StatusDot $online={false} />
              </FriendItem>
              
              <FriendItem>
                <RadioButton selected={false} />
                <FriendName>Dr_Dome_112</FriendName>
                <StatusDot $online={true} />
              </FriendItem>
            </FriendsList>
            
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <span>▼</span>
            </div>
          </OptionCard>
        </RightPanel>
      </ContentWrapper>
    </LandingContainer>
  );
};

export default LandingPage; 