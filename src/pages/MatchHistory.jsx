import './MatchHistory.css'
import SearchBar from "../components/SearchBar.jsx";
import {useEffect, useState} from "react";
import AccountIdSuggestion from "../components/AccountIdSuggestion.jsx";
import {getAllHeroes, getPlayerHistory} from "../services/deadlockApi.js";
import MatchCard from "../components/MatchCard.jsx";

function MatchHistory() {
  const MATCH_COUNT = 20;
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState(() => {
    return JSON.parse(sessionStorage.getItem("match-history")) || [];
  });
  const [error, setError] = useState(null);
  const [heroMap, setHeroMap] = useState(() => {
    return JSON.parse(sessionStorage.getItem("hero-map")) || {};
  });
  const [accountId, setAccountId] = useState(() => {
    return localStorage.getItem("steam-account-id") || "";
  });

  // Get all heroes and keep them in a map
  // Needed to match every different hero per match in match history
  useEffect(() => {
    // If sessionStorage has the heroMap already, don't hit the API
    if (Object.keys(heroMap).length > 0) return;

    getAllHeroes()
      .then((heroes) => {
        const map = {};
        heroes.forEach((hero) => {
          map[hero.id] = hero;
        })
        setHeroMap(map);
        sessionStorage.setItem("hero-map", JSON.stringify(map));
      })
      .catch((err) => {
        console.error("Could not load hero map", err);
      })
  }, [heroMap])

  // Instantly get match history if there was accountId in local storage
  useEffect(() => {
    if (accountId && !(matches.length > 0)) {
      handleSearch(accountId);
    }
  }, [])

  // Simple regex to check valid Account ID
  const isValidInt = (str) => /^\d+$/.test(str.trim());

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch(query);
  }

  function handleSearchButton() {
    handleSearch(query);
  }

  async function handleSearch(searchId) {
    const trimmedAccountId = searchId.toString().trim();
    // Don't do anything if search is empty
    if (!trimmedAccountId) return
    // Check if it's a valid ID
    else if (!isValidInt(trimmedAccountId)) {
      setError(new Error(`Player AccountID must be numeric`));
      setMatches([]);
      return;
    }

    setError(null);
    setMatches([]);

    try {
      const data = await getPlayerHistory(trimmedAccountId);
      // If data is empty, which happens when Steam user hasn't played any Deadlock matches
      if (data.length === 0) {
        setError(new Error("No history found"));
        return;
      }
      const slicedData = data.slice(0, MATCH_COUNT)
      setMatches(slicedData); // Display MATCH_COUNT number of matches
      setAccountId(trimmedAccountId); // Set account ID
      localStorage.setItem("steam-account-id", trimmedAccountId); // Save account ID to local storage
      sessionStorage.setItem("match-history", JSON.stringify(slicedData));
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
        onClickSearchButton={handleSearchButton}
        hasError={!!error}
      />
      {error && <p>{error.message}</p>}

      {matches && matches.length > 0 && (
        <>
          <p className="hint" style={{margin: 0}}>AccountId: {matches[0].account_id}</p>
          <div id="history">
            {matches.map((match) => (
              <MatchCard
                key={match.match_id}
                match={match}
                hero={heroMap[match.hero_id]}
              />
            ))}
            <p className="hint">Last {MATCH_COUNT} matches loaded</p>
          </div>
        </>
      )}
      <AccountIdSuggestion/>
    </>
  )
}

export default MatchHistory;