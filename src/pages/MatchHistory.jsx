import './MatchHistory.css'
import SearchBar from "../components/SearchBar.jsx";
import {useEffect, useState} from "react";
import AccountIdSuggestion from "../components/AccountIdSuggestion.jsx";
import {getAllHeroes, getPlayerHistory} from "../services/deadlockApi.js";
import MatchCard from "../components/MatchCard.jsx";

function MatchHistory() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [heroMap, setHeroMap] = useState([]);
  const [accountId, setAccountId] = useState(() => {
    return localStorage.getItem("steam-account-id") || "";
  });

  // Get all heroes and keep them in a map
  // Needed to match every different hero per match in match history
  useEffect(() => {
    getAllHeroes().then((heroes) => {
      const map = {};
      heroes.forEach((hero) => {
        map[hero.id] = hero;
      })
      setHeroMap(map);
    })
  }, [])

  useEffect(() => {
    if (accountId) {
      handleSearch(accountId);
    }
  }, [])

  // Simple regex to check valid Account ID
  const isValidInt = (str) => /^\d+$/.test(str.trim());

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  async function handleSearch(id = query) {
    const trimmed = id.toString().trim();
    // Don't do anything if search is empty
    if (!trimmed) return
    // Check if it's a valid ID
    else if (!isValidInt(trimmed)) {
      setError(new Error(`Player with AccountID ${trimmed} doesn't exist`));
      setMatches([]);
      return;
    }

    setError(null);
    setMatches([]);

    try {
      const data = await getPlayerHistory(trimmed);
      // If data is empty, which happens when Steam user hasn't played any Deadlock matches
      if (data.length === 0) {
        setError(new Error("No history found"));
        return;
      }
      setMatches(data.slice(0, 50)); // Display matches (50)
      setAccountId(trimmed); // Set account ID
      localStorage.setItem("steam-account-id", trimmed); // Save account ID to local storage
    } catch (err) {
      setError(err);
    }
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
      {error && <p>{error.message}</p>}

      {matches && matches.length > 0 && (
        <>
          <p className="hint" style={{ margin: 0 }}>AccountId: {matches[0].account_id}</p>
          <div id="history">
            {matches.map((match) => (
              <MatchCard
                key={match.match_id}
                match={match}
                hero={heroMap[match.hero_id]}
              />
            ))}
            <p className="hint">Last 50 matches loaded</p>
          </div>
        </>
          )}
      <AccountIdSuggestion />
    </>
  )
}

export default MatchHistory;