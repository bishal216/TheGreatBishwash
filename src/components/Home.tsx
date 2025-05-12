import { Container, Typography, Box } from '@mui/material';
import { games } from '../config/games';
import GameCard from './GameCard';

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          The Great Bishwash
        </Typography>
      </Box>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 4
      }}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Box>
    </Container>
  );
} 