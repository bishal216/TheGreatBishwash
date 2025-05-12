import type { TileType, Monster, Treasure } from './types';

export const BOARD_SIZE = 8;
export const INITIAL_HEALTH = 3;
export const INITIAL_SCORE = 0;
export const HAND_SIZE = 5;
export const MIN_TREASURES_TO_WIN = 3;

export const TILE_SYMBOLS: Record<TileType, string> = {
  empty: ' ',
  start: 'S',
  exit: 'E',
  trap: 'X',
  treasure: 'T',
  monster: 'M'
};

export const TILE_COLORS: Record<TileType, string> = {
  empty: '#4a4a4a',
  start: '#4CAF50',
  exit: '#2196F3',
  trap: '#F44336',
  treasure: '#FFC107',
  monster: '#9C27B0'
};

export const MONSTERS: Monster[] = [
  {
    name: 'Goblin',
    hp: 1,
    effect: 'Deal 1 damage',
    reward: 'Gain 1 treasure'
  },
  {
    name: 'Orc',
    hp: 2,
    effect: 'Deal 2 damage',
    reward: 'Gain 2 treasures'
  },
  {
    name: 'Dragon',
    hp: 3,
    effect: 'Deal 3 damage',
    reward: 'Gain 3 treasures'
  }
];

export const TREASURES: Treasure[] = [
  {
    name: 'Golden Bone',
    effect: 'Gain 1 point',
    points: 1
  },
  {
    name: 'Wings of the Queen',
    effect: 'Next Queen move ignores traps',
    points: 0
  },
  {
    name: 'Bandage Wrap',
    effect: 'Heal 1 HP',
    points: 0
  },
  {
    name: 'Cursed Idol',
    effect: 'Gain 1 treasure but discard 2 cards',
    points: 1
  }
];

export const CARD_TYPES = {
  MOVEMENT: 'movement',
  COMBAT: 'combat',
  UTILITY: 'utility'
} as const; 