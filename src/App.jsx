import './App.css'
import {Route, Routes} from "react-router-dom";
import MatchHistory from "./pages/MatchHistory.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MatchHistory />} />
        <Route path="/match-history" element={<MatchHistory />} />
        {/*<Route path={"/hero-lore-search" element=}*/}

      </Routes>
    </>
  )
}

export default App
