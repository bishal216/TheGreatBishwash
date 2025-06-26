import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

type Bishwash = {
  id: number;
  x: number;
  y: number;
  speed: number;
};

export default function CatchBishwash() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bishwashes, setBishwashes] = useState<Bishwash[]>([]);
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });

  const gameAreaRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setGameArea({
        width: node.clientWidth,
        height: node.clientHeight,
      });
    }
  }, []);

  const spawnBishwash = useCallback(() => {
    const newBishwash: Bishwash = {
      id: Date.now(),
      x: Math.random() * (gameArea.width - 50),
      y: -50,
      speed: 2 + Math.random() * 3,
    };
    setBishwashes(prev => [...prev, newBishwash]);
  }, [gameArea.width]);

  const moveBishwashes = useCallback(() => {
    setBishwashes(prev => {
      const updated = prev.map(bishwash => ({
        ...bishwash,
        y: bishwash.y + bishwash.speed,
      }));

      // Remove bishwashes that have gone off screen
      return updated.filter(bishwash => bishwash.y < gameArea.height);
    });
  }, [gameArea.height]);

  const catchBishwash = (id: number) => {
    setBishwashes(prev => prev.filter(bishwash => bishwash.id !== id));
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return newScore;
    });
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setBishwashes([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(spawnBishwash, 1000);
    const moveInterval = setInterval(moveBishwashes, 16);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [isPlaying, spawnBishwash, moveBishwashes]);

  useEffect(() => {
    if (bishwashes.some(bishwash => bishwash.y >= gameArea.height)) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [bishwashes, gameArea.height]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Catch Bishwash
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Catch as many Bishwashes as you can before they overwhelm you!
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h6">Score: {score}</Typography>
          <Typography variant="h6">High Score: {highScore}</Typography>
        </Box>

        {!isPlaying && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              disabled={isPlaying}
            >
              {gameOver ? 'Play Again' : 'Start Game'}
            </Button>
          </Box>
        )}

        <Paper
          ref={gameAreaRef}
          elevation={3}
          sx={{
            position: 'relative',
            width: '100%',
            height: '60vh',
            overflow: 'hidden',
            bgcolor: 'background.default',
          }}
        >
          {bishwashes.map(bishwash => (
            <Box
              key={bishwash.id}
              onClick={() => catchBishwash(bishwash.id)}
              sx={{
                position: 'absolute',
                left: bishwash.x,
                top: bishwash.y,
                width: 50,
                height: 50,
                cursor: 'pointer',
                transition: 'transform 0.1s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                '&:active': {
                  transform: 'scale(0.9)',
                },
              }}
            >
              <img
                src="/images/Bishwash_Head.png"
                alt="Bishwash"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          ))}

          {gameOver && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Game Over!
              </Typography>
              <Typography variant="h6">
                Final Score: {score}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}