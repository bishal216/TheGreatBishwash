import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Game } from "@/config/games";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Card component={Link} to={`/${game.id}`} sx={{ textDecoration: "none" }}>
      <CardContent>
        <Typography variant="h5">{game.title}</Typography>
        <Typography variant="body2">{game.description}</Typography>
      </CardContent>
    </Card>
  );
}
