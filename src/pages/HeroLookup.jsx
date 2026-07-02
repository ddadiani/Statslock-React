import './HeroLookup.css'
import SearchBar from "../components/SearchBar.jsx";
import HeroCard from "../components/HeroCard.jsx";
import {useState} from "react";
import {getHero} from "../services/deadlockApi.js";

function HeroLookup() {
  const [query, setQuery] = useState("");
  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);


  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  async function handleSearch() {
    if (!query.trim()) return // Don't do anything if search is empty

    setError(null);
    setHero(null);

    try {
      const data = await getHero(query.trim());
      setHero(data);
    } catch (err) {
      setError(err);
    }
  }


  return (
    <>
      <h2>Hero Lookup</h2>
      <SearchBar
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onSearch={handleSearch}
        placeholder="Enter hero name..."
        hasError={!!error}
      />
      {error && <p>{error.message + ". Please enter a valid hero."}</p>}
      {hero && <HeroCard hero={hero}/>}
    </>
  )
}

export default HeroLookup;