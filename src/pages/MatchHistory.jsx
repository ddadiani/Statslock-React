import './MatchHistory.css'
import SearchBar from "../components/SearchBar.jsx";
import {useState} from "react";

function MatchHistory() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);


  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  async function handleSearch() {
    if (!query.trim()) return // Don't do anything if search is empty
  }

  return (
    <>
      <h2>Player Lookup</h2>
      <SearchBar
        placeholder="Enter Steam AccountID..."
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onSearch={handleSearch}
        hasError={!!error}
      />
      {matches && matches.map((match) => (
        <p>{match.id}</p>
      ))}
    </>
  )
}

export default MatchHistory;