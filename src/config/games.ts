import React from "react";

// Game components
import CatchBishwash from "@/games/CatchBishwash";
import FifteenPuzzle from "@/games/FifteenPuzzle";
import FifteenPuzzleSlider from "@/games/FifteenPuzzleVariation";
export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  component: React.ComponentType;
  category: "arcade" | "puzzle" | "word" | "card" | "strategy";
}

export const games: Game[] = [
  {
    id: "overwhelm",
    title: "Catch Bishwash",
    description: "Everything slips away.",
    imageUrl: "/images/Bishwash_Head.png",
    component: CatchBishwash,
    category: "arcade",
  },
  {
    id: "fifteen-puzzle",
    title: "Fifteen Puzzle",
    description: "A classic sliding puzzle game.",
    imageUrl: "/images/fifteen-puzzle.png",
    component: FifteenPuzzle,
    category: "puzzle",
  },
  {
    id: "fifteen-puzzle-variation",
    title: "Sixteen Puzzle",
    description: "A variation of the classic sliding puzzle game.",
    imageUrl: "/images/fifteen-puzzle-variation.png",
    component: FifteenPuzzleSlider,
    category: "puzzle",
  },
];
