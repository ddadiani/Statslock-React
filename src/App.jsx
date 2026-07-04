import {Navigate, Route, Routes} from "react-router-dom";
import MatchHistory from "./pages/MatchHistory.jsx";
import HeroLookup from "./pages/HeroLookup.jsx";
import HeroTierList from "./pages/HeroTierList.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="match-history" replace/>}/>
        <Route path="/match-history" element={<MatchHistory/>}/>
        <Route path="/hero-lookup" element={<HeroLookup/>}/>
        <Route path="/hero-tier-list" element={<HeroTierList/>}/>


      </Routes>
    </>
  )
}

export default App
