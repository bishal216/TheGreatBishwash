import { Container, Typography, Box } from '@mui/material';
import { games } from '../config/games';
import GameCard from '../components/GameCard';


export default function Home() {
  return (
    <>
    <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, sm: 4 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: '700',
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: 2,
            userSelect: 'none',
          }}
        >
          The Great Bishwash
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Discover amazing games curated just for you. Explore, play, and enjoy!
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 5,
          px: { xs: 0, sm: 2 },
        }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Box>
    </Container>
    </>
  );
}
