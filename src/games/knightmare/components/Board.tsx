import { Box, Typography } from '@mui/material';
import type { GameState, Position, TileType } from '../types';
import { TILE_COLORS, TILE_SYMBOLS } from '../constants';
import { getTileSymbol } from '../utils';

interface BoardProps {
  gameState: GameState;
  onTileClick: (position: Position) => void;
}

interface LegendItem {
  symbol: string;
  description: string;
  type?: TileType;
}

export const Board = ({ gameState, onTileClick }: BoardProps) => {
  const { board } = gameState;

  const legendItems: LegendItem[] = [
    { symbol: 'S', description: 'Start', type: 'start' },
    { symbol: 'E', description: 'Exit', type: 'exit' },
    { symbol: 'T', description: 'Treasure', type: 'treasure' },
    { symbol: 'M', description: 'Monster', type: 'monster' },
    { symbol: 'X', description: 'Trap', type: 'trap' },
    { symbol: 'P', description: 'Player' },
    { symbol: '?', description: 'Hidden' }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box 
        sx={{ 
          width: 'min(80vw, 600px)',
          aspectRatio: '1',
          margin: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(8, 1fr)',
          gap: '4px',
          bgcolor: '#2c2c2c',
          padding: '4px',
          borderRadius: '4px'
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onTileClick({ row: rowIndex, col: colIndex })}
              sx={{
                bgcolor: tile.revealed 
                  ? TILE_COLORS[tile.type] 
                  : (rowIndex + colIndex) % 2 === 0 
                    ? '#4a4a4a' 
                    : '#2c2c2c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                aspectRatio: '1',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              {getTileSymbol(tile)}
            </Box>
          ))
        )}
      </Box>

      <Box sx={{ mt: 2, maxWidth: 'min(80vw, 600px)', margin: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom>
          Legend:
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 2
        }}>
          {legendItems.map((item) => (
            <Box key={item.symbol} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: item.symbol === '?' 
                    ? '#2c2c2c' 
                    : item.type 
                      ? TILE_COLORS[item.type]
                      : '#4a4a4a',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              >
                {item.symbol}
              </Box>
              <Typography variant="body2">
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}; 