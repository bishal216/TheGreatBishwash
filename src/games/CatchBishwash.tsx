import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { useState, useEffect, useCallback, useRef } from "react";
import bishwashImg from "@/assets/bishwash.png";

const messages: string[] = [
  "Why are you doing this?",
  "Is there any meaning?",
  "The catch is futile.",
  "Everything slips away.",
  "Time flows endlessly...",
  "What do you even gain?",
  "Is the score real?",
  "You can't catch existence.",
  "The game never ends.",
  "Is there a point?",
  "You can't catch the past.",
  "The future is uncertain.",
  "You can't catch the present.",
  "The more you catch, the less you have.",
  "You can't catch happiness.",
  "You can't catch peace.",
  "You can't catch love.",
  "You can't catch time.",
  "You can't catch life.",
  "You can't catch the universe.",
  "You can't catch the infinite.",
  "You can't catch the void.",
  "You can't catch the unknown.",
  "You can't catch the mystery.",
  "You can't catch the essence.",
  "You can't catch the truth.",
  "You can't catch the meaning.",
  "You can't catch the light.",
  "You can't catch the darkness.",
  "You can't catch the chaos.",
  "You can't catch the order.",
  "You can't catch the balance.",
  "You can't catch the harmony.",
];

type Bishwash = {
  id: number;
  x: number;
  y: number;
  angle: number;
};

const CatchBishwash = () => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bishwashes, setBishwashes] = useState<Bishwash[]>([]);
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });
  const [overlays, setOverlays] = useState<string[]>([]);

  const gameAreaRef = useRef<HTMLDivElement>(null);

  const spawnBishwash = useCallback(() => {
    const newBishwash: Bishwash = {
      id: Date.now(),
      x: Math.random() * (gameArea.width - 50),
      y: Math.random() * (gameArea.height - 50),
      angle: Math.random() * 360,
    };
    setBishwashes((prev) => [...prev, newBishwash]);
  }, [gameAreaRef.current?.offsetWidth]);

  const catchBishwash = (id: number) => {
    setBishwashes((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => {
      const newScore = prev + 1;
      return newScore;
    });
  };

  const startGame = () => {
    setScore(0);
    setBishwashes([]);
    setTimeout(() => setIsPlaying(true), 100);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(spawnBishwash, 1000);

    return () => {
      clearInterval(spawnInterval);
    };
  }, [isPlaying, spawnBishwash]);

  useEffect(() => {
    const appearAt = 19;
    const addEvery = 10;

    if (!isPlaying) {
      setOverlays([]);
      return;
    }

    if (score < appearAt) {
      setOverlays([]);
      return;
    }

    const count = Math.min(
      Math.floor((score - appearAt) / addEvery) + 1,
      messages.length,
    );

    setOverlays(() => {
      const nextMessages = messages.slice(0, count);

      if (nextMessages.length > 12) {
        return nextMessages.slice(nextMessages.length - 12);
      }

      return nextMessages;
    });
  }, [score, isPlaying]);

  useEffect(() => {
    const updateGameAreaSize = () => {
      if (gameAreaRef.current) {
        setGameArea({
          width: gameAreaRef.current.clientWidth,
          height: gameAreaRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", updateGameAreaSize);
    updateGameAreaSize();

    return () => {
      window.removeEventListener("resize", updateGameAreaSize);
    };
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 2, fontFamily: '"Press Start 2P", cursive' }}
    >
      <Box sx={{ mb: 2, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Catch Bishwash
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Catch as many as you can!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <Typography>Score: {score}</Typography>
        </Box>
      </Box>

      <Paper
        ref={gameAreaRef}
        elevation={3}
        sx={{
          position: "relative",
          width: "100%",
          height: "60vh",
          overflow: "hidden",
          bgcolor: "#c0c0c0",
          backgroundSize: "cover",
          imageRendering: "pixelated",
        }}
      >
        {!isPlaying && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            size="large"
            onClick={startGame}
          >
            Start Game
          </Button>
        )}
        {overlays.map((msg, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: `${10 + i * 7}%`,
              left: "50%",
              transform: "translateX(-50%)",
              color: "primary",
              fontSize: "1rem",
              fontWeight: "bold",
              textShadow: "0 0 5px rgba(0,0,0,0.7)",
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.2 + i * 0.1,
              transition: "opacity 1s ease-in",
              whiteSpace: "nowrap",
              fontFamily: '"Courier New", monospace',
            }}
          >
            {msg}
          </Box>
        ))}
        {bishwashes.map((b) => (
          <Box
            key={b.id}
            onClick={() => catchBishwash(b.id)}
            onTouchStart={() => catchBishwash(b.id)}
            sx={{
              position: "absolute",
              left: b.x,
              top: b.y,
              width: 50,
              height: 50,
              cursor: "pointer",
              transition: "transform 0.1s ease",
              transform: `rotate(${b.angle}deg)`,
              "&:hover": {
                transform: `rotate(${b.angle}deg) scale(1.1)`,
              },
              "&:active": {
                transform: `rotate(${b.angle}deg) scale(0.9)`,
              },
            }}
          >
            <img
              src={bishwashImg}
              alt="Bishwash"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default CatchBishwash;
