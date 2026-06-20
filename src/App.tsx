import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth";
import Creator from "@/pages/Creator";
import GameDetail from "@/pages/GameDetail";
import Home from "@/pages/Home";
import Play from "@/pages/Play";
import Profile from "@/pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:gameId" element={<GameDetail />} />
        <Route path="/play/:gameId" element={<Play />} />
        <Route path="/create" element={<Creator />} />
        <Route path="/create/:draftId" element={<Creator />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
