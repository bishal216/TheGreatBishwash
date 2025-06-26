import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

const GAME_TIME = 60000; // 60 seconds
const MIN_PEEP_TIME = 500;
const MAX_PEEP_TIME = 1000;

interface Hole {
  id: number;
  isUp: boolean;
}

export default function WhackABishwash() {
  const [holes, setHoles] = useState<Hole[]>(Array(9).fill(null).map((_, i) => ({ id: i, isUp: false })));
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [highScore, setHighScore] = useState(0);

  const getRandomHole = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * holes.length);
    return randomIndex;
  }, [holes.length]);

  const peep = useCallback(() => {
    if (!gameRunning) return;

    const randomHoleIndex = getRandomHole();
    const randomTime = Math.random() * (MAX_PEEP_TIME - MIN_PEEP_TIME) + MIN_PEEP_TIME;

    setHoles(prevHoles => 
      prevHoles.map((hole, index) => 
        index === randomHoleIndex ? { ...hole, isUp: true } : hole
      )
    );

    setTimeout(() => {
      setHoles(prevHoles => 
        prevHoles.map((hole, index) => 
          index === randomHoleIndex ? { ...hole, isUp: false } : hole
        )
      );
      if (gameRunning) {
        peep();
      }
    }, randomTime);
  }, [gameRunning, getRandomHole]);

  const whack = (holeId: number) => {
    if (!gameRunning || !holes[holeId].isUp) return;

    setScore(prevScore => {
      const newScore = prevScore + 1;
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return newScore;
    });

    setHoles(prevHoles =>
      prevHoles.map(hole =>
        hole.id === holeId ? { ...hole, isUp: false } : hole
      )
    );
  };

  const startGame = () => {
    if (gameRunning) return;

    setScore(0);
    setGameRunning(true);
    setTimeLeft(GAME_TIME);
    peep();
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (gameRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1000);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameRunning(false);
    }
    return () => clearInterval(timer);
  }, [gameRunning, timeLeft]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Whack A Bishwash
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          How many Bishwashes can you whack in a minute?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
          <Typography variant="h5">Score: {score}</Typography>
          <Typography variant="h5">High Score: {highScore}</Typography>
          <Typography variant="h5">Time: {Math.ceil(timeLeft / 1000)}s</Typography>
        </Box>

        {!gameRunning && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              disabled={gameRunning}
            >
              {timeLeft === GAME_TIME ? 'Start Game' : 'Play Again'}
            </Button>
          </Box>
        )}

        <Grid container spacing={2} sx={{ maxWidth: 600, mx: 'auto' }}>
          {holes.map((hole) => (
            <Grid item xs={4} key={hole.id}>
              <Paper
                elevation={3}
                sx={{
                  aspectRatio: '1',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  bgcolor: 'primary.light',
                }}
                onClick={() => whack(hole.id)}
              >
                {hole.isUp && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.1s',
                      transform: 'translateY(-100%)',
                      '&:hover': {
                        transform: 'translateY(-100%) scale(1.1)',
                      },
                    }}
                  >
                    <img
                      src="/images/Bishwash_Head.png"
                      alt="Bishwash"
                      style={{
                        width: '80%',
                        height: '80%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {timeLeft === 0 && (
          <Paper elevation={3} sx={{ p: 3, mt: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Game Over!
            </Typography>
            <Typography variant="h5">
              Final Score: {score}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
} 