import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import CrosswordGame from '../components/CrosswordGame';
import LandingPage from '../components/LandingPage';
import CrosswordCreator from '../components/CrosswordCreator';
import { darkTheme } from '../styles/theme';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  background-color: ${darkTheme.background.primary};
  color: ${darkTheme.text.primary};
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameWrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${darkTheme.background.primary};
  width: 100%;
`;

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [gameMode, setGameMode] = useState(null);
  const [currentPuzzleId, setCurrentPuzzleId] = useState(null);

  const handleStartGame = (mode) => {
    if (mode === 'creator') {
      setCurrentScreen('creator');
    } else {
      setGameMode(mode);
      setCurrentScreen('game');
    }
  };

  const handleBackToHome = (newScreen, puzzleId) => {
    if (newScreen === 'play' && puzzleId) {
      // Navigate to the game screen with the created puzzle
      setCurrentPuzzleId(puzzleId);
      setGameMode('solo');  // Playing own created puzzle is always solo mode
      setCurrentScreen('game');
    } else {
      // Regular navigation back to landing page
      setCurrentScreen('landing');
      setGameMode(null);
      setCurrentPuzzleId(null);
    }
  };

  return (
    <Container>
      <Head>
        <title>CollabCross - Crossword Puzzle Game</title>
        <meta name="description" content="A collaborative crossword puzzle game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        {currentScreen === 'landing' ? (
          <LandingPage onStartGame={handleStartGame} />
        ) : currentScreen === 'creator' ? (
          <GameWrapper>
            <CrosswordCreator onBackToHome={handleBackToHome} />
          </GameWrapper>
        ) : (
          <GameWrapper>
            <CrosswordGame 
              mode={gameMode}
              onBackToHome={handleBackToHome}
              puzzleId={currentPuzzleId}
            />
          </GameWrapper>
        )}
      </Main>
    </Container>
  );
} 