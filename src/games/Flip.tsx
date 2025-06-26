import { Container, Typography, Box, Paper } from "@mui/material";
import { useState, useEffect } from "react";

type Card = {
  id: number;
  isKangaroo: boolean;
  isFlipped: boolean;
};

export default function Flip() {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const initializeGame = () => {
    const newCards = Array.from({ length: 9 }, (_, index) => ({
      id: index,
      isKangaroo: Math.random() < 0.5,
      isFlipped: false,
    }));
    setCards(newCards);
    setMoves(0);
    setGameComplete(false);
    setTimeLeft(60);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete]);

  const handleCardClick = (clickedId: number) => {
    if (gameComplete || cards[clickedId].isFlipped) return;

    setCards(
      cards.map((card) =>
        card.id === clickedId ? { ...card, isFlipped: true } : card,
      ),
    );
    setMoves(moves + 1);

    // Check if all cards are flipped correctly
    const newCards = cards.map((card) =>
      card.id === clickedId ? { ...card, isFlipped: true } : card,
    );

    const allCorrect = newCards.every(
      (card) => card.isFlipped === card.isKangaroo,
    );

    if (allCorrect) {
      setGameComplete(true);
    }
  };

  const getCardColor = (card: Card) => {
    if (!card.isFlipped) return "primary.light";
    return card.isKangaroo ? "success.light" : "error.light";
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Flip
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Flip cards such that its always Kangaroo side up.
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Time Left: {timeLeft}s
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Moves: {moves}
          </Typography>
          {gameComplete && (
            <Typography
              variant="h4"
              align="center"
              color={timeLeft > 0 ? "success.main" : "error.main"}
              sx={{ mt: 2 }}
            >
              {timeLeft > 0
                ? `Congratulations! You won in ${moves} moves!`
                : "Time's up! Try again!"}
            </Typography>
          )}
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {cards.map((card) => (
            <Paper
              key={card.id}
              elevation={3}
              onClick={() => handleCardClick(card.id)}
              sx={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "2rem",
                backgroundColor: getCardColor(card),
                transition: "transform 0.3s ease-in-out",
                transform: card.isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                "&:hover": {
                  transform: card.isFlipped
                    ? "rotateY(180deg)"
                    : "rotateY(0) scale(1.05)",
                },
              }}
            >
              {card.isFlipped ? (card.isKangaroo ? "🦘" : "❌") : "?"}
            </Paper>
          ))}
        </Box>

        {gameComplete && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <button
              onClick={initializeGame}
              style={{
                padding: "10px 20px",
                fontSize: "1.1rem",
                cursor: "pointer",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Play Again
            </button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
