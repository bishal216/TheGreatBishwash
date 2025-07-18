import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

import bgImage from "@/assets/bgBishwash2.jpg";

const SIZE = 4; // 4x4 grid
const TILE_SIZE = 80;

const getInitialTiles = () =>
  Array.from({ length: SIZE * SIZE }, (_, i) => i + 1);

const shuffleTiles = (times = 100) => {
  const shuffled = [...getInitialTiles()];

  for (let i = 0; i < times; i++) {
    const row = Math.floor(Math.random() * (SIZE - 1));
    const col = Math.floor(Math.random() * (SIZE - 1));

    const idx = (r: number, c: number) => r * SIZE + c;

    const a = idx(row, col);
    const b = idx(row, col + 1);
    const c = idx(row + 1, col + 1);
    const d = idx(row + 1, col);

    const temp = shuffled[a];
    shuffled[a] = shuffled[d];
    shuffled[d] = shuffled[c];
    shuffled[c] = shuffled[b];
    shuffled[b] = temp;
  }

  return shuffled;
};

export default function TileRotationGame() {
  const [tiles, setTiles] = useState<number[]>(() => shuffleTiles());
  const [showNumbers, setShowNumbers] = useState(true);

  const rotate2x2 = (row: number, col: number) => {
    if (row >= SIZE - 1 || col >= SIZE - 1) return;

    const idx = (r: number, c: number) => r * SIZE + c;
    const newTiles = [...tiles];

    const a = idx(row, col);
    const b = idx(row, col + 1);
    const c = idx(row + 1, col + 1);
    const d = idx(row + 1, col);

    // Clockwise rotation of values
    const temp = newTiles[a];
    newTiles[a] = newTiles[d];
    newTiles[d] = newTiles[c];
    newTiles[c] = newTiles[b];
    newTiles[b] = temp;

    setTiles(newTiles);
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        2x2 Rotating Puzzle
      </Typography>
      <Button
        variant="outlined"
        onClick={() => setShowNumbers((prev) => !prev)}
        sx={{ mb: 2 }}
      >
        {showNumbers ? "Hide Numbers" : "Show Numbers"}
      </Button>

      <Box
        sx={{
          position: "relative",
          width: TILE_SIZE * SIZE,
          height: TILE_SIZE * SIZE,
          mx: "auto",
          border: "2px solid #333",
          padding: 2,
          cursor: 'url("/rotateCursor.svg") 16 16, crosshair',
        }}
      >
        {tiles.map((tile, index) => {
          const row = Math.floor(index / SIZE);
          const col = index % SIZE;
          return (
            <motion.div
              key={tile}
              layout
              layoutId={`tile-${tile}`}
              style={{
                position: "absolute",
                top: row * TILE_SIZE,
                left: col * TILE_SIZE,
                width: TILE_SIZE - 4,
                height: TILE_SIZE - 4,
                backgroundColor: "#64b5f6",
                color: "white",
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "400% 400%",
                backgroundPosition: `${((tile - 1) % 4) * 33.3333}% ${
                  Math.floor((tile - 1) / 4) * 33.3333
                }%`,
                border: "0px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",

                userSelect: "none",
              }}
              onClick={() => rotate2x2(row, col)}
              transition={{ duration: 0.4 }}
            >
              {showNumbers ? tile : ""}
            </motion.div>
          );
        })}
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => setTiles(shuffleTiles())}
      >
        Reset
      </Button>
    </Box>
  );
}
