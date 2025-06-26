import React from "react";
import CatchBishwash from "@/games/CatchBishwash";
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
];
