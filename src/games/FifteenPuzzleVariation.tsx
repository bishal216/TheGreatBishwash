import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

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
              sx={{ fontSize: "1.5rem", mx: 0.5 }}
            >
              ↑
            </Button>
          ))}
        </Box>

        {/* Main Puzzle Grid with Left/Right Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {[0, 1, 2, 3].map((row) => (
            <Box
              key={row}
              sx={{ display: "flex", alignItems: "center", mb: 0 }}
            >
              {/* Left Arrow */}
              <Button
                size="small"
                variant="outlined"
                sx={{ fontSize: "1.5rem", mr: 0.5 }}
                onClick={() => rotate("row", row, "left")}
                aria-label={`Rotate row ${row + 1} left`}
              >
                ←
              </Button>

              {/* Row Tiles */}
              {tiles.slice(row * 4, row * 4 + 4).map((tile, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 70,
                    height: 70,
                    backgroundImage: `url(${puzzleImg})`,
                    backgroundSize: "400% 400%",
                    backgroundPosition: `${((tile - 1) % 4) * 33.3333}% ${
                      Math.floor((tile - 1) / 4) * 33.3333
                    }%`,
                    border: "1px solid #fff",
                    boxShadow: 2,
                    mx: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "1.2rem",
                    userSelect: "none",
                  }}
                  title={`Tile ${tile}`}
                />
              ))}

              {/* Right Arrow */}
              <Button
                size="small"
                variant="outlined"
                sx={{ fontSize: "1.5rem", ml: 0.5 }}
                onClick={() => rotate("row", row, "right")}
                aria-label={`Rotate row ${row + 1} right`}
              >
                →
              </Button>
            </Box>
          ))}
        </Box>
        {/* Bottom Arrows */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          {[0, 1, 2, 3].map((col) => (
            <Button
              key={`down-${col}`}
              variant="outlined"
              sx={{ fontSize: "1.5rem", mx: 0.5 }}
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
