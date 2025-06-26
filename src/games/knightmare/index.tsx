import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Board } from './components/Board';
import { GameStats } from './components/GameStats';
import { Hand } from './components/Hand';
import type { GameState, Position, Card } from './types';
import { initializeBoard, isValidMove } from './utils';
import { cards } from './cards';
import { HAND_SIZE, MIN_TREASURES_TO_WIN } from './constants';

const KnightmareBoard = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialState = initializeBoard();
    return {
      ...initialState,
      hand: [],
      deck: [...cards],
      discardPile: [],
      treasures: 0
    };
  });

  // Draw initial hand
  useEffect(() => {
    drawCards();
  }, []);

  const drawCards = () => {
    const newGameState = { ...gameState };
    const cardsToDraw = HAND_SIZE - gameState.hand.length;
    
    for (let i = 0; i < cardsToDraw; i++) {
      if (newGameState.deck.length === 0) {
        // Shuffle discard pile into deck
        newGameState.deck = [...newGameState.discardPile];
        newGameState.discardPile = [];
      }
      
      if (newGameState.deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * newGameState.deck.length);
        const [drawnCard] = newGameState.deck.splice(randomIndex, 1);
        newGameState.hand.push(drawnCard);
      }
    }
    
    setGameState(newGameState);
  };

  const handleTileClick = (position: Position) => {
    if (!isValidMove(position) || gameState.gameOver || gameState.gameWon) {
      return;
    }

    const newGameState = { ...gameState };
    const { row, col } = position;
    const tile = newGameState.board[row][col];

    // Reveal the tile
    tile.revealed = true;

    // Handle different tile types
    switch (tile.type) {
      case 'treasure':
        if (tile.treasure) {
          newGameState.score += tile.treasure.points;
          newGameState.treasures += 1;
          // Apply treasure effect
          if (tile.treasure.name === 'Bandage Wrap') {
            newGameState.health = Math.min(newGameState.health + 1, 3);
          } else if (tile.treasure.name === 'Cursed Idol') {
            newGameState.treasures += 1;
            // Discard 2 cards
            for (let i = 0; i < 2 && newGameState.hand.length > 0; i++) {
              const [discardedCard] = newGameState.hand.splice(0, 1);
              newGameState.discardPile.push(discardedCard);
            }
          }
        }
        drawCards();
        break;
      case 'trap':
        newGameState.health -= 1;
        break;
      case 'monster':
        if (tile.monster) {
          // Combat resolution
          newGameState.health -= 1; // Monster deals damage
          if (tile.monster.hp <= 1) {
            // Player wins combat
            newGameState.score += 5;
            newGameState.treasures += 1;
            drawCards();
          } else {
            // Monster survives
            tile.monster.hp -= 1;
          }
        }
        break;
      case 'exit':
        if (newGameState.treasures >= MIN_TREASURES_TO_WIN) {
          newGameState.gameWon = true;
        } else {
          // Can't exit without enough treasures
          return;
        }
        break;
    }

    // Update player position
    newGameState.board[gameState.playerPosition.row][gameState.playerPosition.col].hasPlayer = false;
    tile.hasPlayer = true;
    newGameState.playerPosition = position;

    // Check game over conditions
    if (newGameState.health <= 0) {
      newGameState.gameOver = true;
    }

    setGameState(newGameState);
  };

  const handleCardPlay = (card: Card) => {
    const newGameState = card.effect(gameState);
    
    // Move played card to discard pile
    const cardIndex = newGameState.hand.findIndex(c => c.id === card.id);
    if (cardIndex !== -1) {
      const [playedCard] = newGameState.hand.splice(cardIndex, 1);
      newGameState.discardPile.push(playedCard);
    }
    
    setGameState(newGameState);
    drawCards();
  };

  const handleNewGame = () => {
    const initialState = initializeBoard();
    const newGameState = {
      ...initialState,
      hand: [] as Card[],
      deck: [...cards],
      discardPile: [] as Card[],
      treasures: 0
    };
    
    // Draw initial hand
    const cardsToDraw = HAND_SIZE;
    for (let i = 0; i < cardsToDraw; i++) {
      if (newGameState.deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * newGameState.deck.length);
        const [drawnCard] = newGameState.deck.splice(randomIndex, 1);
        newGameState.hand.push(drawnCard);
      }
    }
    
    setGameState(newGameState);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Knightmare Board
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Chess meets dungeon crawling
        </Typography>
        
        <GameStats gameState={gameState} />
        <Board gameState={gameState} onTileClick={handleTileClick} />
        <Hand 
          cards={gameState.hand} 
          onCardPlay={handleCardPlay}
          disabled={gameState.gameOver || gameState.gameWon}
        />
        
        {(gameState.gameOver || gameState.gameWon) && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewGame}
            sx={{ mt: 2 }}
          >
            Play Again
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default KnightmareBoard; 