import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LimbAndLoot from './games/LimbAndLoot';
import KnightmareBoard from './games/knightmare';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import Home from './components/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/games/wab" element={<WhackABishwash />} /> */}
          {/* <Route path="/games/rps" element={<RockPaperScissors />} /> */}
          {/* <Route path="/games/memory" element={<Memory />} /> */}
          {/* <Route path="/games/flip" element={<Flip />} /> */}
          {/* <Route path="/games/catch" element={<CatchBishwash />} /> */}
          {/* <Route path="/games/nordle" element={<Nordle />} /> */}
          <Route path="/games/limb-and-loot" element={<LimbAndLoot />} />
          <Route path="/games/knightmare" element={<KnightmareBoard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
