export type TileType = 'empty' | 'start' | 'exit' | 'trap' | 'treasure' | 'monster';

export interface Monster {
  name: string;
  hp: number;
  effect: string;
  reward: string;
}

export interface Treasure {
  name: string;
  effect: string;
  points: number;
}

export interface Tile {
  type: TileType;
  revealed: boolean;
  hasPlayer: boolean;
  monster?: Monster;
  treasure?: Treasure;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: Tile[][];
  playerPosition: Position;
  hand: Card[];
  deck: Card[];
  discardPile: Card[];
  score: number;
  health: number;
  treasures: number;
  gameOver: boolean;
  gameWon: boolean;
}

export type CardType = 'pawn' | 'rook' | 'bishop' | 'knight' | 'queen';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  description: string;
  effect: (gameState: GameState) => GameState;
} 