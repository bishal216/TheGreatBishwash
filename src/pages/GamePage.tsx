import { useParams } from "react-router-dom";
import { games } from "@/config/games";
import { Button, Typography, Box } from "@mui/material";

export default function GamePage() {
  const { gameId } = useParams();
  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return <Typography variant="h4">Game not found</Typography>;
  }

  const GameComponent = game.component;

  return (
    <Box sx={{ px: 2, pt: 2 }}>
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        onClick={() => window.history.back()}
      >
        Back to Games
      </Button>
      <GameComponent />
    </Box>
  );
}
