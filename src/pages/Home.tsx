import { Container, Box } from "@mui/material";
import { games } from "@/config/games";
import GameCard from "@/components/GameCard";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, sm: 4 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 5,
          px: { xs: 0, sm: 2 },
        }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Box>
    </Container>
  );
}
