import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import puzzleImg from "@/assets/bgBishwash2.jpg";

export default function FifteenPuzzleSlider() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const generateTiles = (): number[] => {
    let tiles = Array.from({ length: 16 }, (_, i) => i + 1);
    for (let i = 0; i < 100; i++) {
      const type = Math.random() < 0.5 ? "row" : "col";
      const index = Math.floor(Math.random() * 4);
      const dir = Math.random() < 0.5 ? "left" : "right";
      if (type === "row") {
        tiles = rotateRow(tiles, index, dir as "left" | "right");
      } else {
        tiles = rotateCol(tiles, index, dir as "up" | "down");
      }
    }
    return tiles;
  };

  const isSolved = (tiles: number[]) => {
    return tiles.every((val, idx) => val === idx + 1);
  };

  const rotateRow = (
    tiles: number[],
    rowIndex: number,
    dir: "left" | "right",
  ) => {
    const newTiles = [...tiles];
    const start = rowIndex * 4;
    const row = newTiles.slice(start, start + 4);

    if (dir === "left") row.push(row.shift()!);
    else row.unshift(row.pop()!);

    for (let i = 0; i < 4; i++) newTiles[start + i] = row[i];
    return newTiles;
  };

  const rotateCol = (tiles: number[], colIndex: number, dir: "up" | "down") => {
    const newTiles = [...tiles];
    const col = [0, 1, 2, 3].map((i) => newTiles[i * 4 + colIndex]);

    if (dir === "up") col.push(col.shift()!);
    else col.unshift(col.pop()!);

    for (let i = 0; i < 4; i++) newTiles[i * 4 + colIndex] = col[i];
    return newTiles;
  };

  const rotate = (
    type: "row" | "col",
    index: number,
    dir: "left" | "right" | "up" | "down",
  ) => {
    let newTiles = [...tiles];
    if (type === "row")
      newTiles = rotateRow(newTiles, index, dir as "left" | "right");
    if (type === "col")
      newTiles = rotateCol(newTiles, index, dir as "up" | "down");

    setTiles(newTiles);
    setMoves((m) => m + 1);
    if (isSolved(newTiles)) setWon(true);
  };

  const resetGame = () => {
    const shuffled = generateTiles();
    setTiles(shuffled);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        15 Puzzle Slider
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Moves: {moves}
      </Typography>

      <Box sx={{ position: "relative", textAlign: "center" }}>
        {/* Top Arrows */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          {[0, 1, 2, 3].map((col) => (
            <Button
              variant="outlined"
              key={`up-${col}`}
              size="small"
              onClick={() => rotate("col", col, "up")}
              sx={{ fontSize: "1.5rem", mx: 0, width: 70, height: 70 }}
            >
              ↑
            </Button>
          ))}
        </Box>

        {/* Main Puzzle Grid with Left/Right Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mb: 2,
          }}
        >
          {/* Left Arrows */}
          <Box sx={{ display: "flex", flexDirection: "column", mr: 1 }}>
            {[0, 1, 2, 3].map((row) => (
              <Button
                variant="outlined"
                key={`left-${row}`}
                size="small"
                onClick={() => rotate("row", row, "left")}
                sx={{
                  fontSize: "1.2rem",
                  Width: 70,
                  height: 70,
                  p: 0,
                }}
              >
                ←
              </Button>
            ))}
          </Box>

          {/* Puzzle Grid */}
          <Box
            sx={{
              position: "relative",
              width: 4 * 70,
              height: 4 * 70,
            }}
          >
            {tiles.map((tile, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              return (
                <motion.div
                  key={tile}
                  layout
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    top: row * 70,
                    left: col * 70,
                    width: 70,
                    height: 70,
                    backgroundImage: `url(${puzzleImg})`,
                    backgroundSize: "400% 400%",
                    backgroundPosition: `${((tile - 1) % 4) * 33.3333}% ${
                      Math.floor((tile - 1) / 4) * 33.3333
                    }%`,
                    border: "1px solid #fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    borderRadius: 4,
                    userSelect: "none",
                  }}
                >
                  {tile}
                </motion.div>
              );
            })}
          </Box>

          {/* Right Arrows */}
          <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
            {[0, 1, 2, 3].map((row) => (
              <Button
                key={`right-${row}`}
                variant="outlined"
                size="small"
                onClick={() => rotate("row", row, "right")}
                sx={{
                  fontSize: "1.2rem",
                  minWidth: 70,
                  height: 70,
                  p: 0,
                }}
              >
                →
              </Button>
            ))}
          </Box>
        </Box>
        {/* Bottom Arrows */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          {[0, 1, 2, 3].map((col) => (
            <Button
              key={`down-${col}`}
              variant="outlined"
              sx={{ fontSize: "1.5rem", width: 70, height: 70, mx: 0 }}
              size="small"
              onClick={() => rotate("col", col, "down")}
              aria-label={`Rotate column ${col + 1} down`}
            >
              ↓
            </Button>
          ))}
        </Box>
      </Box>

      <Button variant="contained" sx={{ mt: 2 }} onClick={resetGame}>
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
