import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useCallback } from "react";
import { words } from "./nordle/words";

type BoardState = {
  guesses: string[];
  targetWord: string;
  isComplete: boolean;
};

type GameState = {
  boards: BoardState[];
  currentGuess: string;
  gameComplete: boolean;
};

export default function Nordle() {
  const [gameState, setGameState] = useState<GameState>({
    boards: [],
    currentGuess: "",
    gameComplete: false,
  });
  const [numBoards, setNumBoards] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const [showSetup, setShowSetup] = useState(true);

  const getRandomWord = useCallback(() => {
    return words[Math.floor(Math.random() * words.length)];
  }, []);

  const initializeGame = useCallback(() => {
    const newBoards = Array.from({ length: numBoards }, () => ({
      guesses: [],
      targetWord: getRandomWord(),
      isComplete: false,
    }));
    setGameState({
      boards: newBoards,
      currentGuess: "",
      gameComplete: false,
    });
    setShowSetup(false);
  }, [numBoards, getRandomWord]);

  const checkGuess = (guess: string, targetWord: string) => {
    const result = Array(5).fill("not-in-word");
    const targetLetters = targetWord.split("");
    const guessLetters = guess.split("");

    // First pass: mark correct positions
    guessLetters.forEach((letter, i) => {
      if (letter === targetLetters[i]) {
        result[i] = "correct";
        targetLetters[i] = ""; // Mark as used
      }
    });

    // Second pass: mark letters in wrong position
    guessLetters.forEach((letter, i) => {
      if (result[i] === "not-in-word") {
        const targetIndex = targetLetters.indexOf(letter);
        if (targetIndex !== -1) {
          result[i] = "in-word";
          targetLetters[targetIndex] = ""; // Mark as used
        }
      }
    });

    return result;
  };

  const handleGuess = () => {
    if (gameState.currentGuess.length !== 5) return;

    const newBoards = gameState.boards.map((board) => {
      if (board.isComplete) return board;

      const newGuesses = [...board.guesses, gameState.currentGuess];
      const isComplete = gameState.currentGuess === board.targetWord;

      return {
        ...board,
        guesses: newGuesses,
        isComplete,
      };
    });

    const gameComplete = newBoards.every((board) => board.isComplete);

    setGameState({
      boards: newBoards,
      currentGuess: "",
      gameComplete,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGuess();
    } else if (e.key === "Backspace") {
      setGameState((prev) => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      if (gameState.currentGuess.length < 5) {
        setGameState((prev) => ({
          ...prev,
          currentGuess: prev.currentGuess + e.key.toLowerCase(),
        }));
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          n-ordle
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Guess the words on multiple boards simultaneously!
        </Typography>

        {showSetup ? (
          <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
            <Typography variant="h6" gutterBottom>
              Choose how many n-ordle boards you want to play simultaneously
            </Typography>
            <TextField
              type="number"
              label="Number of n-ordles"
              value={numBoards}
              onChange={(e) =>
                setNumBoards(
                  Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)),
                )
              }
              inputProps={{ min: 1, max: 1000 }}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={initializeGame}
              sx={{ py: 1.5 }}
            >
              Start Game
            </Button>
          </Paper>
        ) : (
          <Box>
            <Box
              sx={{ display: "flex", gap: 2, mb: 4, justifyContent: "center" }}
            >
              <Button onClick={() => setShowHelp(true)}>How to Play</Button>
              <Button onClick={() => setShowSetup(true)}>New Game</Button>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 4,
              }}
            >
              {gameState.boards.map((board, boardIndex) => (
                <Paper key={boardIndex} elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Board {boardIndex + 1}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                      <Box key={rowIndex} sx={{ display: "flex", gap: 1 }}>
                        {Array.from({ length: 5 }).map((_, colIndex) => {
                          const guess = board.guesses[rowIndex];
                          const letter = guess?.[colIndex] || "";
                          const status = guess
                            ? checkGuess(guess, board.targetWord)[colIndex]
                            : "";

                          return (
                            <Box
                              key={colIndex}
                              sx={{
                                width: 40,
                                height: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid",
                                borderColor: "grey.300",
                                backgroundColor:
                                  status === "correct"
                                    ? "success.main"
                                    : status === "in-word"
                                      ? "warning.main"
                                      : status === "not-in-word"
                                        ? "grey.400"
                                        : "transparent",
                                color: status ? "white" : "inherit",
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                              }}
                            >
                              {letter.toUpperCase()}
                            </Box>
                          );
                        })}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              ))}
            </Box>

            <Paper
              elevation={3}
              sx={{ p: 2, mt: 4, maxWidth: 400, mx: "auto" }}
            >
              <TextField
                value={gameState.currentGuess}
                onChange={(e) => {
                  const value = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z]/g, "")
                    .slice(0, 5);
                  setGameState((prev) => ({ ...prev, currentGuess: value }));
                }}
                onKeyDown={handleKeyPress}
                placeholder="Enter your guess"
                fullWidth
                inputProps={{ maxLength: 5 }}
                disabled={gameState.gameComplete}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleGuess}
                disabled={
                  gameState.currentGuess.length !== 5 || gameState.gameComplete
                }
                sx={{ mt: 2 }}
              >
                Guess
              </Button>
            </Paper>

            {gameState.gameComplete && (
              <Typography
                variant="h5"
                align="center"
                color="success.main"
                sx={{ mt: 4 }}
              >
                Congratulations! You've solved all the boards!
              </Typography>
            )}
          </Box>
        )}

        <Dialog
          open={showHelp}
          onClose={() => setShowHelp(false)}
          maxWidth="md"
        >
          <DialogTitle>How to Play Nordle</DialogTitle>
          <DialogContent>
            <Typography paragraph>
              Nordle is like Wordle, but with <strong>multiple boards</strong>!
              Guess the words on all boards simultaneously.
            </Typography>
            <Typography paragraph>
              After each guess, each board will give you feedback. The color of
              the tiles will show how close you are for that board:
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography
                component="span"
                sx={{ color: "success.main", fontWeight: "bold" }}
              >
                Green
              </Typography>
              : Correct letter and position
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                component="span"
                sx={{ color: "warning.main", fontWeight: "bold" }}
              >
                Yellow
              </Typography>
              : Correct letter, wrong position
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                component="span"
                sx={{ color: "grey.400", fontWeight: "bold" }}
              >
                Gray
              </Typography>
              : Letter not in the word
            </Box>
            <Typography paragraph>
              <strong>Rules:</strong>
            </Typography>
            <ul>
              <li>
                Guess a word, and it applies to <strong>all boards</strong>.
              </li>
              <li>
                Each board will provide feedback based on the hidden word for
                that board.
              </li>
              <li>Win by solving all boards in the fewest guesses possible!</li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowHelp(false)}>I understand</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
