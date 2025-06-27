import TinyQueue from "tinyqueue";

type State = number[];
type Move = { state: State; moves: number; path: number[][] };

const targetState = [...Array(15).keys()].map((i) => i + 1).concat(0);

// Manhattan distance heuristic
const heuristic = (tiles: State): number => {
  let dist = 0;
  let linearConflicts = 0;

  for (let i = 0; i < 16; i++) {
    const tile = tiles[i];
    if (tile === 0) continue;

    const goalIdx = tile - 1;
    const [x1, y1] = [i % 4, Math.floor(i / 4)];
    const [x2, y2] = [goalIdx % 4, Math.floor(goalIdx / 4)];

    // Basic Manhattan distance
    dist += Math.abs(x1 - x2) + Math.abs(y1 - y2);

    // Linear Conflict: row
    if (y1 === y2) {
      for (let j = 0; j < 4; j++) {
        const idx = y1 * 4 + j;
        const other = tiles[idx];
        if (other === 0 || other === tile) continue;
        const goalOther = other - 1;
        const [gx, gy] = [goalOther % 4, Math.floor(goalOther / 4)];
        if (gy === y1 && gx < x1 && j > x1) {
          linearConflicts++;
        }
      }
    }

    // Linear Conflict: column
    if (x1 === x2) {
      for (let j = 0; j < 4; j++) {
        const idx = j * 4 + x1;
        const other = tiles[idx];
        if (other === 0 || other === tile) continue;
        const goalOther = other - 1;
        const [gx, gy] = [goalOther % 4, Math.floor(goalOther / 4)];
        if (gx === x1 && gy < y1 && j > y1) {
          linearConflicts++;
        }
      }
    }
  }

  return dist + 2 * linearConflicts;
};

// Generate possible next states by sliding tile
const getNextStates = (state: State): State[] => {
  const next: State[] = [];
  const empty = state.indexOf(0);
  const [x, y] = [empty % 4, Math.floor(empty / 4)];
  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  for (const [dx, dy] of dirs) {
    const nx = x + dx,
      ny = y + dy;
    if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4) {
      const swapIndex = ny * 4 + nx;
      const newState = [...state];
      [newState[empty], newState[swapIndex]] = [
        newState[swapIndex],
        newState[empty],
      ];
      next.push(newState);
    }
  }
  return next;
};

// A* search
export const solvePuzzle = (start: State): State[] | null => {
  const visited = new Set<string>();
  const queue = new TinyQueue<Move>(
    [],
    (a: Move, b: Move) =>
      a.moves + heuristic(a.state) - (b.moves + heuristic(b.state)),
  );

  queue.push({ state: start, moves: 0, path: [start] });

  while (queue.length) {
    const { state, moves, path } = queue.pop()!;
    const key = state.join(",");
    if (visited.has(key)) continue;
    visited.add(key);

    if (state.join() === targetState.join()) {
      return path;
    }

    for (const next of getNextStates(state)) {
      if (!visited.has(next.join(","))) {
        queue.push({ state: next, moves: moves + 1, path: [...path, next] });
      }
    }
  }

  return null;
};
