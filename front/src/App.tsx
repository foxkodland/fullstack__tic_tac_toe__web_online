import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginPage from './pages/LoginPage/LoginPage.tsx';
import PlayersPage from "./pages/PlayersPage/PlayersPage.tsx";
import GamePage from "./pages/GamePage/GamePage.tsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/match/:id" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
