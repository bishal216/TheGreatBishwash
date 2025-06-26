import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { useState } from 'react';

type Choice = 'Rock' | 'Paper' | 'Scissors';
type Difficulty = 'easy' | 'hard';

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<Choice | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];

  const getOpponentChoice = (playerChoice: Choice): Choice => {
    if (difficulty === 'easy') {
      return choices[Math.floor(Math.random() * 3)];
    } else {
      // Hard mode: opponent always counters player's choice
      switch (playerChoice) {
        case 'Rock':
          return 'Paper';
        case 'Paper':
          return 'Scissors';
        case 'Scissors':
          return 'Rock';
      }
    }
  };

  const determineWinner = (player: Choice, opponent: Choice): string => {
    if (player === opponent) return "It's a tie!";
    
    if (
      (player === 'Rock' && opponent === 'Scissors') ||
      (player === 'Paper' && opponent === 'Rock') ||
      (player === 'Scissors' && opponent === 'Paper')
    ) {
      return 'You win!';
    }
    
    return 'Opponent wins!';
  };

  const handleChoice = (choice: Choice) => {
    setPlayerChoice(choice);
    const opponentChoice = getOpponentChoice(choice);
    setOpponentChoice(opponentChoice);
    setResult(determineWinner(choice, opponentChoice));
    setGameStarted(true);
  };

  const startNewGame = () => {
    setPlayerChoice(null);
    setOpponentChoice(null);
    setResult(null);
    setGameStarted(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Rock, Paper, Scissors
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Practice against a kangaroo and try to win against Bishwash!
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button
            variant={difficulty === 'easy' ? 'contained' : 'outlined'}
            onClick={() => setDifficulty('easy')}
          >
            Easy (Kangaroo)
          </Button>
          <Button
            variant={difficulty === 'hard' ? 'contained' : 'outlined'}
            onClick={() => setDifficulty('hard')}
          >
            Hard (Bishwash)
          </Button>
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Your Choice</Typography>
              <Box sx={{ minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {playerChoice ? (
                  <Typography variant="h4">{playerChoice}</Typography>
                ) : (
                  <Typography color="text.secondary">Make your choice</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Opponent's Choice</Typography>
              <Box sx={{ minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {opponentChoice ? (
                  <Typography variant="h4">{opponentChoice}</Typography>
                ) : (
                  <Typography color="text.secondary">Waiting for your move</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          {choices.map((choice) => (
            <Button
              key={choice}
              variant="contained"
              size="large"
              onClick={() => handleChoice(choice)}
              disabled={gameStarted}
            >
              {choice}
            </Button>
          ))}
        </Box>

        {result && (
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              {result}
            </Typography>
            <Button variant="contained" onClick={startNewGame}>
              Play Again
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
} 