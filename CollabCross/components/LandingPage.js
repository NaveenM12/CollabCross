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
  display: flex;
  align-items: center;
`;

const CollabText = styled.span`
  color: ${darkTheme.brand.primary};
`;

const CrossText = styled.span`
  color: ${darkTheme.text.primary};
  display: flex;
  align-items: center;
  &:before {
    content: "×";
    font-size: 60px;
    margin: 0 8px;
  }
`;

const TitleText = styled.h1`
  font-size: 28px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: normal;
  color: ${darkTheme.text.secondary};
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background-color: ${darkTheme.background.secondary};
  border-radius: 12px;
  padding: 30px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
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
  margin-bottom: 30px;
  color: ${darkTheme.brand.primary};
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 25%;
    right: 25%;
    height: 2px;
    background: ${darkTheme.brand.primary};
    opacity: 0.3;
  }
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
  padding: 15px;
  font-size: 20px;
  border-radius: 10px;
  transition: all 0.2s ease;
  background-color: ${props => props.selected ? `${darkTheme.background.tertiary}` : 'transparent'};
  border: 1px solid ${props => props.selected ? darkTheme.brand.primary : 'transparent'};
  
  &:hover {
    background-color: ${darkTheme.background.tertiary};
    transform: translateX(5px);
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
  flex-shrink: 0;
`;

const RadioButtonInner = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${darkTheme.brand.primary};
`;

const ModeIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${darkTheme.brand.primary};
  font-size: 26px;
  flex-shrink: 0;
`;

const ModeText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModeTitle = styled.div`
  font-weight: bold;
`;

const ModeDescription = styled.div`
  font-size: 14px;
  color: ${darkTheme.text.secondary};
  margin-top: 4px;
`;

const StartButton = styled.button`
  background-color: ${darkTheme.brand.primary};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 16px 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 30px;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: ${darkTheme.brand.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: ${darkTheme.background.tertiary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0) 70%
    );
    transform: translateX(-100%);
  }
  
  &:hover:not(:disabled):after {
    animation: shine 1.5s infinite;
  }
  
  @keyframes shine {
    100% {
      transform: translateX(100%);
    }
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
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
  color: ${darkTheme.text.tertiary};
  position: relative;
  
  &:before, &:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: ${darkTheme.border.primary};
  }
  
  &:before {
    left: 0;
  }
  
  &:after {
    right: 0;
  }
`;

const OptionCard = styled.div`
  border: 1px solid ${darkTheme.border.primary};
  border-radius: 12px;
  padding: 20px;
  background-color: ${darkTheme.background.secondary};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

const RandomPartnerButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${darkTheme.background.secondary};
  border: 2px solid ${darkTheme.brand.primary};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 18px;
  cursor: pointer;
  color: ${darkTheme.brand.primary};
  font-weight: bold;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${darkTheme.background.tertiary};
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const FriendsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid ${darkTheme.border.primary};
  padding-bottom: 10px;
`;

const FriendsTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  color: ${darkTheme.brand.primary};
`;

const AddFriendButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${darkTheme.text.secondary};
  transition: color 0.2s, transform 0.2s;
  
  &:hover {
    color: ${darkTheme.brand.primary};
    transform: scale(1.2);
  }
`;

const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${darkTheme.background.tertiary};
    transform: translateX(5px);
  }
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
  box-shadow: 0 0 10px ${props => props.$online ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'};
`;

const LandingPage = ({ onStartGame }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleStartGame = () => {
    if (selectedMode) {
      onStartGame(selectedMode);
    }
  };

  const handleFriendSelect = (friendName) => {
    setSelectedFriend(friendName);
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
              <ModeOption selected={selectedMode === 'solo'} onClick={() => setSelectedMode('solo')}>
                <RadioButton>
                  {selectedMode === 'solo' && <RadioButtonInner />}
                </RadioButton>
                <ModeIcon>🏆</ModeIcon>
                <ModeText>
                  <ModeTitle>Versus Mode</ModeTitle>
                  <ModeDescription>Compete against friends to solve puzzles fastest</ModeDescription>
                </ModeText>
              </ModeOption>
              
              <ModeOption selected={selectedMode === 'collab'} onClick={() => setSelectedMode('collab')}>
                <RadioButton>
                  {selectedMode === 'collab' && <RadioButtonInner />}
                </RadioButton>
                <ModeIcon>👥</ModeIcon>
                <ModeText>
                  <ModeTitle>Collaborative Play</ModeTitle>
                  <ModeDescription>Work together to solve challenging puzzles</ModeDescription>
                </ModeText>
              </ModeOption>
              
              <ModeOption selected={selectedMode === 'creator'} onClick={() => setSelectedMode('creator')}>
                <RadioButton>
                  {selectedMode === 'creator' && <RadioButtonInner />}
                </RadioButton>
                <ModeIcon>✏️</ModeIcon>
                <ModeText>
                  <ModeTitle>Create Puzzle</ModeTitle>
                  <ModeDescription>Design your own crossword puzzles to share</ModeDescription>
                </ModeText>
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
              <FriendItem onClick={() => handleFriendSelect('Milan_J12')}>
                <RadioButton>
                  {selectedFriend === 'Milan_J12' && <RadioButtonInner />}
                </RadioButton>
                <FriendName>Milan_J12</FriendName>
                <StatusDot $online={true} />
              </FriendItem>
              
              <FriendItem onClick={() => handleFriendSelect('Jacob_S')}>
                <RadioButton>
                  {selectedFriend === 'Jacob_S' && <RadioButtonInner />}
                </RadioButton>
                <FriendName>Jacob_S</FriendName>
                <StatusDot $online={false} />
              </FriendItem>
              
              <FriendItem onClick={() => handleFriendSelect('Dr_Dome_112')}>
                <RadioButton>
                  {selectedFriend === 'Dr_Dome_112' && <RadioButtonInner />}
                </RadioButton>
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