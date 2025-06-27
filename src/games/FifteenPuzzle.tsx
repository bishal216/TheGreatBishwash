import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import puzzleImg from "@/assets/bgBishwash2.jpg";

import { solvePuzzle } from "./AI/FifteenSolver";
const generateTiles = (): number[] => {
  const tiles = Array.from({ length: 16 }, (_, i) => i);
  do {
    shuffle(tiles);
  } while (!isSolvable(tiles) || isSolved(tiles));
  return tiles;
};

const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const isSolvable = (tiles: number[]) => {
  // Width
  const N: number = tiles.length;
  const W: number = N ** 0.5;

  // Get inversion count
  let invCount = 0;
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) invCount++;
    }
  }

  // Check for odd
  if (W & 1) return !(invCount & 1);

  // Find position of blank from bottom
  const blankIndex = tiles.indexOf(0);
  const blankRowFromBottom = W - Math.floor(blankIndex / W);

  // Check for even
  if (blankRowFromBottom & 1) return !(invCount & 1);
  else return invCount & 1;
};

const isSolved = (tiles: number[]) => {
  for (let i = 0; i < 15; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[15] === 0;
};

export default function FifteenPuzzle() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffled = generateTiles();
    setTiles(shuffled);
    setMoves(0);
    setWon(false);
  };

  const handleTileClick = (index: number) => {
    if (won) return;

    const newTiles = [...tiles];
    const emptyIndex = tiles.indexOf(0);

    const [row, col] = [Math.floor(index / 4), index % 4];
    const [emptyRow, emptyCol] = [Math.floor(emptyIndex / 4), emptyIndex % 4];

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      setMoves((m) => m + 1);
      if (isSolved(newTiles)) {
        setWon(true);
      }
    }
  };

  const handleAutoSolve = () => {
    const solution = solvePuzzle(tiles);
    if (solution) {
      let i = 1;
      const interval = setInterval(() => {
        setTiles(solution[i]);
        i++;
        if (i >= solution.length) clearInterval(interval);
      }, 300);
    } else {
      alert("No solution found");
    }
  };
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        15 Puzzle Game
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Moves: {moves}
      </Typography>

      <Grid
        container
        spacing={0}
        sx={{
          width: "100%",
          maxWidth: 360,
          mx: "auto",
          mb: 3,
          aspectRatio: "1 / 1", // makes the grid square
        }}
      >
        {tiles.map((tile, index) => (
          <Grid size={3} key={index}>
            <Box
              onClick={() => handleTileClick(index)}
              sx={{
                aspectRatio: "1 / 1",
                backgroundImage: tile === 0 ? "none" : `url(${puzzleImg})`,
                backgroundSize: "400% 400%", // 4x4 grid
                backgroundPosition:
                  tile === 0
                    ? "none"
                    : `${((tile - 1) % 4) * 33.3333}% ${Math.floor((tile - 1) / 4) * 33.3333}%`,
                border: tile === 0 ? "none" : "1px solid #fff",
                borderRadius: 1,
                boxShadow: tile === 0 ? "none" : 2,
                cursor: tile === 0 ? "default" : "pointer",
                "&:hover": {
                  transform: tile !== 0 ? "scale(1.05)" : "none",
                },
                transition: "transform 0.15s ease-in-out",
                backgroundColor: tile === 0 ? "#ddd" : "transparent",
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" onClick={handleAutoSolve} disabled>
        Auto Solve
      </Button>
      <Button variant="contained" onClick={resetGame}>
        Reset Game
      </Button>

      {won && (
        <Typography variant="h6" sx={{ mt: 2, color: "green" }}>
          You solved it in {moves} moves!
        </Typography>
      )}
    </Box>
  );
}
