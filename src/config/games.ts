export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path: string;
  category: 'arcade' | 'puzzle' | 'word' | 'card' | 'strategy';
}

export const games: Game[] = [
  {
    id: 'limb-and-loot',
    title: 'Limb and Loot',
    description: 'A Bone-Rattling Party Game of Skeleton Sabotage',
    imageUrl: '/images/Bishwash_Head.png',
    path: '/games/limb-and-loot',
    category: 'card'
  },
  {
    id: 'knightmare',
    title: 'Knightmare Board',
    description: 'Chess meets dungeon crawling in a tactical, card-driven solo adventure',
    imageUrl: '/images/Bishwash_Head.png',
    path: '/games/knightmare',
    category: 'strategy'
  }
];