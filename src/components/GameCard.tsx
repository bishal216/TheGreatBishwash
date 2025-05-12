import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Game } from '../config/games';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={game.imageUrl}
        alt={game.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {game.title}
        </Typography>
        <Typography>
          {game.description}
        </Typography>
      </CardContent>
      <Button
        component={Link}
        to={game.path}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Play Now
      </Button>
    </Card>
  );
} 