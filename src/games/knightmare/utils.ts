import type { GameState, Position, Tile, Monster, Treasure } from './types';
import { BOARD_SIZE, TILE_SYMBOLS, MONSTERS, TREASURES } from './constants';

const getRandomPosition = (): Position => ({
  row: Math.floor(Math.random() * BOARD_SIZE),
  col: Math.floor(Math.random() * BOARD_SIZE)
});

const isPositionValid = (pos: Position, existingPositions: Position[]): boolean => {
  return !existingPositions.some(p => p.row === pos.row && p.col === pos.col);
};

export const createEmptyBoard = (): Tile[][] => {
  return Array(BOARD_SIZE).fill(null).map(() =>
    Array(BOARD_SIZE).fill(null).map(() => ({
      type: 'empty',
      revealed: false,
      hasPlayer: false
    }))
  );
};

export const initializeBoard = (): GameState => {
  const board: Tile[][] = Array(BOARD_SIZE).fill(null).map(() =>
    Array(BOARD_SIZE).fill(null).map(() => ({
      type: 'empty',
      revealed: false,
      hasPlayer: false
    }))
  );

  // Place start position (A1)
  const startPosition = { row: BOARD_SIZE - 1, col: 0 };
  board[startPosition.row][startPosition.col] = {
    type: 'start',
    revealed: true,
    hasPlayer: true
  };

  // Place exit position (H8)
  const exitPosition = { row: 0, col: BOARD_SIZE - 1 };
  board[exitPosition.row][exitPosition.col] = {
    type: 'exit',
    revealed: false,
    hasPlayer: false
  };

  // Place random tiles
  const existingPositions = [startPosition, exitPosition];
  const numMonsters = Math.floor(Math.random() * 5) + 3; // 3-7 monsters
  const numTreasures = Math.floor(Math.random() * 5) + 3; // 3-7 treasures
  const numTraps = Math.floor(Math.random() * 3) + 2; // 2-4 traps

  // Place monsters
  for (let i = 0; i < numMonsters; i++) {
    let position: Position;
    do {
      position = getRandomPosition();
    } while (!isPositionValid(position, existingPositions));

    const monster = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
    board[position.row][position.col] = {
      type: 'monster',
      revealed: false,
      hasPlayer: false,
      monster: { ...monster }
    };
    existingPositions.push(position);
  }

  // Place treasures
  for (let i = 0; i < numTreasures; i++) {
    let position: Position;
    do {
      position = getRandomPosition();
    } while (!isPositionValid(position, existingPositions));

    const treasure = TREASURES[Math.floor(Math.random() * TREASURES.length)];
    board[position.row][position.col] = {
      type: 'treasure',
      revealed: false,
      hasPlayer: false,
      treasure: { ...treasure }
    };
    existingPositions.push(position);
  }

  // Place traps
  for (let i = 0; i < numTraps; i++) {
    let position: Position;
    do {
      position = getRandomPosition();
    } while (!isPositionValid(position, existingPositions));

    board[position.row][position.col] = {
      type: 'trap',
      revealed: false,
      hasPlayer: false
    };
    existingPositions.push(position);
  }

  return {
    board,
    playerPosition: startPosition,
    hand: [],
    deck: [],
    discardPile: [],
    score: 0,
    health: 3,
    treasures: 0,
    gameOver: false,
    gameWon: false
  };
};

export const isValidMove = (position: Position): boolean => {
  return position.row >= 0 && position.row < BOARD_SIZE &&
         position.col >= 0 && position.col < BOARD_SIZE;
};

export const getTileSymbol = (tile: Tile): string => {
  if (tile.hasPlayer) return 'P';
  if (!tile.revealed) return '?';
  return TILE_SYMBOLS[tile.type];
}; 