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


  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  async function handleSearch() {
    if (!query.trim()) return // Don't do anything if search is empty
    setError(null);
    setMatches([]);

    try {
      const data = await getPlayerHistory(query.trim());
      setMatches(data.slice(0, 50));
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
      <div id="history">
        {matches && matches.length > 0 && (
          <>
            {matches.map((match) => (
              <MatchCard
                key={match.match_id}
                match={match}
                hero={heroMap[match.hero_id]}
              />
            ))}
            <p className="hint">Last 50 matches loaded</p>
          </>
        )}
      </div>

      <AccountIdSuggestion />
    </>
  )
}

export default MatchHistory;