import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import GamePage from "@/pages/GamePage";
import { Navbar } from "@/components/Navbar";

function App() {
  return (
    <Router basename="/TheGreatBishwash">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:gameId" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
