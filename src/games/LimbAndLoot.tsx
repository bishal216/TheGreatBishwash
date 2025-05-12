import { Container, Typography, Box, Paper, Button, Grid, Card, CardContent, CardMedia, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';

type CardType = 'limb' | 'mutation' | 'gear' | 'action';

interface GameCard {
  id: string;
  name: string;
  type: CardType;
  description: string;
  imageUrl: string;
  effect?: string;
  duration?: number;
}

interface Player {
  id: number;
  name: string;
  limbs: {
    head: boolean;
    spine: boolean;
    arms: number;
    legs: number;
  };
  hand: GameCard[];
  equipped: GameCard[];
  mutations: GameCard[];
}

const initialCards: GameCard[] = [
  {
    id: 'flaming-arm',
    name: 'Flaming Arm',
    type: 'limb',
    description: 'A blazing appendage that packs a punch',
    imageUrl: '/images/Bishwash_Head.png',
    effect: '+1 Attack but burns off in 3 turns',
    duration: 3
  },
  {
    id: 'bone-wings',
    name: 'Bone Wings',
    type: 'mutation',
    description: 'Skeletal wings that grant aerial advantage',
    imageUrl: '/images/Bishwash_Head.png',
    effect: 'Dodge 1 attack per round'
  },
  {
    id: 'nice-hat',
    name: 'Nice Hat',
    type: 'gear',
    description: 'A stylish accessory that makes you look friendly',
    imageUrl: '/images/Bishwash_Head.png',
    effect: 'It does nothing... but no one can bring themselves to attack you'
  },
  {
    id: 'exploding-ribcage',
    name: 'Exploding Ribcage',
    type: 'action',
    description: 'A volatile chest cavity ready to burst',
    imageUrl: '/images/Bishwash_Head.png',
    effect: 'Blow up a limb from each adjacent skeleton'
  }
];

export default function LimbAndLoot() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: 'Player 1',
      limbs: { head: false, spine: false, arms: 0, legs: 0 },
      hand: [],
      equipped: [],
      mutations: []
    }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    // Initialize game state
    const newPlayers = players.map(player => ({
      ...player,
      hand: initialCards.slice(0, 2) // Deal 2 cards to each player
    }));
    setPlayers(newPlayers);
    setGameStarted(true);
  };

  const drawCards = () => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      const currentPlayerState = newPlayers[currentPlayer];
      
      // Draw 2 new cards
      const newHand = [...currentPlayerState.hand, ...initialCards.slice(0, 2)];
      
      currentPlayerState.hand = newHand;
      return newPlayers;
    });
  };

  const playCard = (cardIndex: number) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      const currentPlayerState = newPlayers[currentPlayer];
      const card = currentPlayerState.hand[cardIndex];

      // Remove card from hand
      currentPlayerState.hand = currentPlayerState.hand.filter((_, index) => index !== cardIndex);

      // Add card to appropriate collection based on type
      switch (card.type) {
        case 'limb':
          if (card.name.includes('Arm')) currentPlayerState.limbs.arms++;
          else if (card.name.includes('Leg')) currentPlayerState.limbs.legs++;
          else if (card.name.includes('Head')) currentPlayerState.limbs.head = true;
          else if (card.name.includes('Spine')) currentPlayerState.limbs.spine = true;
          break;
        case 'mutation':
          currentPlayerState.mutations.push(card);
          break;
        case 'gear':
          currentPlayerState.equipped.push(card);
          break;
        case 'action':
          // Handle action card effects
          break;
      }

      return newPlayers;
    });
  };

  const endTurn = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
    drawCards();
  };

  const checkVictory = (player: Player) => {
    const { limbs } = player;
    return (
      limbs.head &&
      limbs.spine &&
      limbs.arms >= 2 &&
      limbs.legs >= 2
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h2" component="h1">
            Limb and Loot
          </Typography>
          <IconButton onClick={() => setShowRules(true)}>
            <InfoIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          A Bone-Rattling Party Game of Skeleton Sabotage
        </Typography>

        {!gameStarted ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
            >
              Start Game
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {players.map((player, index) => (
              <Grid item xs={12} md={6} key={player.id}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    {player.name} {index === currentPlayer && '(Current Turn)'}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Limbs:</Typography>
                    <Typography>
                      Head: {player.limbs.head ? '✓' : '✗'} | 
                      Spine: {player.limbs.spine ? '✓' : '✗'} | 
                      Arms: {player.limbs.arms}/2 | 
                      Legs: {player.limbs.legs}/2
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Hand:</Typography>
                    <Grid container spacing={2}>
                      {player.hand.map((card, cardIndex) => (
                        <Grid item xs={6} key={card.id}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="140"
                              image={card.imageUrl}
                              alt={card.name}
                            />
                            <CardContent>
                              <Typography variant="h6">{card.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {card.description}
                              </Typography>
                              {index === currentPlayer && (
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => playCard(cardIndex)}
                                  sx={{ mt: 1 }}
                                >
                                  Play Card
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {index === currentPlayer && (
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button variant="contained" onClick={drawCards}>
                        Draw Cards
                      </Button>
                      <Button variant="contained" onClick={endTurn}>
                        End Turn
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={showRules} onClose={() => setShowRules(false)} maxWidth="md">
          <DialogTitle>How to Play Limb and Loot</DialogTitle>
          <DialogContent>
            <Typography paragraph>
              You're a skeleton — freshly reanimated by an amateur necromancer who promptly forgot about you. 
              Now you and your fellow boneheads must scavenge, mutate, and loot your way out of the dungeon and into un-life!
            </Typography>
            <Typography variant="h6" gutterBottom>Core Mechanics:</Typography>
            <Typography paragraph>
              <strong>Card Types:</strong>
            </Typography>
            <ul>
              <li>Limb Cards – Collect body parts: some magical, some malfunctioning, some shiny.</li>
              <li>Mutation Cards – Add chaotic powers: bone wings, acid blood, and more.</li>
              <li>Gear Cards – Equip weapons, hats, and trinkets… if you've got the limbs for it!</li>
              <li>Action Cards – Steal, swap, explode, dodge, and deceive.</li>
            </ul>
            <Typography variant="h6" gutterBottom>How to Win:</Typography>
            <ul>
              <li>Reconstruction Victory: Assemble a full skeleton (1 head, 1 spine, 2 arms, 2 legs).</li>
              <li>Last Bone Standing: Be the only skeleton not completely disassembled.</li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowRules(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
} 