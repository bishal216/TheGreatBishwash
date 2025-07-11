// import { Container, Typography, Box, Grid, Paper } from "@mui/material";
// import { useState, useEffect } from "react";

// interface Card {
//   id: number;
//   name: string;
//   isFlipped: boolean;
//   isMatched: boolean;
// }

// const cardPairs = [
//   { name: "POGmish1" },
//   { name: "POGmish2" },
//   { name: "POGmish3" },
//   { name: "POGmish4" },
//   { name: "POGmish5" },
//   { name: "POGmish6" },
// ];

// const shuffle = (array: Array<Card> = []) => {
//   let currentIndex = array.length;
//   let randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// };

// export default function Memory() {
//   const [cards, setCards] = useState<Card[]>([]);
//   const [flippedCards, setFlippedCards] = useState<number[]>([]);
//   const [score, setScore] = useState(100);
//   const [gameStarted, setGameStarted] = useState(false);

//   const initializeGame = () => {
//     const duplicatedCards = [...cardPairs, ...cardPairs].map((card, index) => ({
//       ...card,
//       id: index,
//       isFlipped: false,
//       isMatched: false,
//     }));
//     setCards(shuffle(duplicatedCards));
//     setScore(100);
//     setGameStarted(true);
//     setFlippedCards([]);
//   };

//   const handleCardClick = (clickedCard: Card) => {
//     if (
//       flippedCards.length === 2 ||
//       flippedCards.includes(clickedCard.id) ||
//       clickedCard.isMatched
//     ) {
//       return;
//     }

//     const newFlippedCards = [...flippedCards, clickedCard.id];
//     setFlippedCards(newFlippedCards);

//     if (newFlippedCards.length === 2) {
//       const [firstCard, secondCard] = newFlippedCards.map(
//         (id) => cards.find((card) => card.id === id)!
//       );

//       if (firstCard.name === secondCard.name) {
//         // Match found
//         setCards((prevCards) =>
//           prevCards.map((card) =>
//             card.id === firstCard.id || card.id === secondCard.id
//               ? { ...card, isMatched: true }
//               : card
//           )
//         );
//         setFlippedCards([]);
//       } else {
//         // No match
//         setScore((prev) => prev - 1);
//         setTimeout(() => {
//           setFlippedCards([]);
//         }, 1000);
//       }
//     }
//   };

//   useEffect(() => {
//     if (gameStarted && cards.every((card) => card.isMatched)) {
//       // Game won
//       setGameStarted(false);
//     }
//   }, [cards, gameStarted]);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h2" component="h1" gutterBottom align="center">
//           Memory
//         </Typography>
//         <Typography
//           variant="body1"
//           align="center"
//           color="text.secondary"
//           sx={{ mb: 4 }}
//         >
//           Test your memory by matching pairs of cards
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//           <Typography variant="h5">Score: {score}</Typography>
//         </Box>

//         {!gameStarted ? (
//           <Box sx={{ display: "flex", justifyContent: "center" }}>
//             <button onClick={initializeGame}>Start Game</button>
//           </Box>
//         ) : (
//           <Grid container spacing={2} sx={{ maxWidth: 800, mx: "auto" }}>
//             {cards.map((card) => (
//               <Grid item xs={4} key={card.id}>
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     height: 100,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor:
//                       card.isFlipped || card.isMatched ? "#f0f0f0" : "#ccc",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleCardClick(card)}
//                 >
//                   {card.isFlipped || card.isMatched ? (
//                     <Typography variant="h6">{card.name}</Typography>
//                   ) : (
//                     <Typography variant="h6">?</Typography>
//                   )}
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Box>
//     </Container>
//   );
// }
