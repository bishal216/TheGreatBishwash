import type { GameState, Position, Card } from './types';
import { BOARD_SIZE } from './constants';

const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < BOARD_SIZE && pos.col >= 0 && pos.col < BOARD_SIZE;
};

const movePlayer = (gameState: GameState, newPosition: Position): GameState => {
  const newGameState = { ...gameState };
  const { row, col } = newPosition;
  
  // Remove player from current position
  newGameState.board[gameState.playerPosition.row][gameState.playerPosition.col].hasPlayer = false;
  
  // Place player in new position
  newGameState.board[row][col].hasPlayer = true;
  newGameState.board[row][col].revealed = true;
  newGameState.playerPosition = newPosition;
  
  return newGameState;
};

export const cards: Card[] = [
  {
    id: 'pawn',
    name: 'Pawn',
    type: 'pawn',
    description: 'Move 1 space forward',
    effect: (gameState: GameState) => {
      const { row, col } = gameState.playerPosition;
      const newPosition = { row: row - 1, col };
      
      if (isValidPosition(newPosition)) {
        return movePlayer(gameState, newPosition);
      }
      return gameState;
    }
  },
  {
    id: 'rook',
    name: 'Rook',
    type: 'rook',
    description: 'Move any number of spaces horizontally or vertically',
    effect: (gameState: GameState) => {
      const { row, col } = gameState.playerPosition;
      const possibleMoves: Position[] = [];
      
      // Horizontal moves
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (c !== col) possibleMoves.push({ row, col: c });
      }
      
      // Vertical moves
      for (let r = 0; r < BOARD_SIZE; r++) {
        if (r !== row) possibleMoves.push({ row: r, col });
      }
      
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        return movePlayer(gameState, randomMove);
      }
      return gameState;
    }
  },
  {
    id: 'bishop',
    name: 'Bishop',
    type: 'bishop',
    description: 'Move any number of spaces diagonally',
    effect: (gameState: GameState) => {
      const { row, col } = gameState.playerPosition;
      const possibleMoves: Position[] = [];
      
      // Diagonal moves
      for (let i = 1; i < BOARD_SIZE; i++) {
        const moves = [
          { row: row + i, col: col + i },
          { row: row + i, col: col - i },
          { row: row - i, col: col + i },
          { row: row - i, col: col - i }
        ];
        
        moves.forEach(move => {
          if (isValidPosition(move)) possibleMoves.push(move);
        });
      }
      
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        return movePlayer(gameState, randomMove);
      }
      return gameState;
    }
  },
  {
    id: 'knight',
    name: 'Knight',
    type: 'knight',
    description: 'Move in an L-shape (2 spaces in one direction, 1 space perpendicular)',
    effect: (gameState: GameState) => {
      const { row, col } = gameState.playerPosition;
      const possibleMoves: Position[] = [
        { row: row - 2, col: col - 1 },
        { row: row - 2, col: col + 1 },
        { row: row - 1, col: col - 2 },
        { row: row - 1, col: col + 2 },
        { row: row + 1, col: col - 2 },
        { row: row + 1, col: col + 2 },
        { row: row + 2, col: col - 1 },
        { row: row + 2, col: col + 1 }
      ].filter(isValidPosition);

      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        return movePlayer(gameState, randomMove);
      }
      return gameState;
    }
  },
  {
    id: 'queen',
    name: 'Queen',
    type: 'queen',
    description: 'Move any number of spaces in any direction',
    effect: (gameState: GameState) => {
      const { row, col } = gameState.playerPosition;
      const possibleMoves: Position[] = [];
      
      // Combine rook and bishop moves
      for (let i = 0; i < BOARD_SIZE; i++) {
        // Horizontal and vertical
        if (i !== col) possibleMoves.push({ row, col: i });
        if (i !== row) possibleMoves.push({ row: i, col });
        
        // Diagonal
        if (i > 0) {
          const moves = [
            { row: row + i, col: col + i },
            { row: row + i, col: col - i },
            { row: row - i, col: col + i },
            { row: row - i, col: col - i }
          ];
          
          moves.forEach(move => {
            if (isValidPosition(move)) possibleMoves.push(move);
          });
        }
      }
      
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        return movePlayer(gameState, randomMove);
      }
      return gameState;
    }
  },
  {
    id: 'heal',
    name: 'Heal',
    description: 'Restore 1 health point',
    effect: (gameState: GameState) => {
      return {
        ...gameState,
        health: Math.min(gameState.health + 1, 3)
      };
    }
  },
  {
    id: 'reveal',
    name: 'Reveal',
    description: 'Reveal all adjacent tiles',
    effect: (gameState: GameState) => {
      const newGameState = { ...gameState };
      const { row, col } = gameState.playerPosition;
      
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          
          if (
            newRow >= 0 && newRow < BOARD_SIZE &&
            newCol >= 0 && newCol < BOARD_SIZE &&
            !(i === 0 && j === 0)
          ) {
            newGameState.board[newRow][newCol].revealed = true;
          }
        }
      }
      
      return newGameState;
    }
  }
]; 