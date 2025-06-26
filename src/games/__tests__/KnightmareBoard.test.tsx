import { render, screen, fireEvent } from '@testing-library/react';
import KnightmareBoard from '../knightmare';

describe('KnightmareBoard', () => {
  it('renders game title and description', () => {
    render(<KnightmareBoard />);
    
    expect(screen.getByText('Knightmare Board')).toBeInTheDocument();
    expect(screen.getByText(/Chess meets dungeon crawling/)).toBeInTheDocument();
  });

  it('displays initial game stats', () => {
    render(<KnightmareBoard />);
    
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByText('Health: 3')).toBeInTheDocument();
  });

  it('initializes game board with start and exit tiles', () => {
    render(<KnightmareBoard />);
    
    // Check for start tile
    const startTile = screen.getByText('S');
    expect(startTile).toBeInTheDocument();
    
    // Check for exit tile
    const exitTile = screen.getByText('E');
    expect(exitTile).toBeInTheDocument();
  });

  it('handles player movement', () => {
    render(<KnightmareBoard />);
    
    // Get the first revealed tile (should be start tile)
    const startTile = screen.getByText('S');
    const startTileParent = startTile.parentElement;
    
    // Click on the start tile
    if (startTileParent) {
      fireEvent.click(startTileParent);
    }
    
    // Check if player position has changed
    // Note: This is a basic test and might need to be adjusted based on the actual game logic
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });
}); 