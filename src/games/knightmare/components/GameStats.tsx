import { Box, Typography } from '@mui/material';
import type { GameState } from '../types';

interface GameStatsProps {
  gameState: GameState;
}

export const GameStats = ({ gameState }: GameStatsProps) => {
  const { score, health, gameOver, gameWon } = gameState;

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Score: {score}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Health: {health}
      </Typography>
      {gameOver && (
        <Typography variant="h5" color="error" gutterBottom>
          Game Over!
        </Typography>
      )}
      {gameWon && (
        <Typography variant="h5" color="success.main" gutterBottom>
          You Win!
        </Typography>
      )}
    </Box>
  );
}; 