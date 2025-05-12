import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import type { Card as CardType } from '../types';

interface HandProps {
  cards: CardType[];
  onCardPlay: (card: CardType) => void;
  disabled?: boolean;
}

export const Hand = ({ cards, onCardPlay, disabled = false }: HandProps) => {
  return (
    <Box sx={{ p: 2, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
      {cards.map((card) => (
        <Card key={card.id} sx={{ minWidth: 200, maxWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {card.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {card.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onCardPlay(card)}
              disabled={disabled}
              sx={{ mt: 1 }}
            >
              Play Card
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}; 