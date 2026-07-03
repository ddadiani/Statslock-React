import './HeroLookup.css'
import SearchBar from "../components/SearchBar.jsx";
import HeroCard from "../components/HeroCard.jsx";
import {useEffect, useMemo, useState} from "react";
import {getAllHeroes, getHero} from "../services/deadlockApi.js";
import Fuse from 'fuse.js'

function HeroLookup() {
  const [query, setQuery] = useState("");
  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);
  const [allHeroes, setAllHeroes] = useState([]);

  useEffect(() => {
    getAllHeroes()
      .then(heroes => heroes.filter(hero => hero.disabled === false))
      .then(setAllHeroes)
      .catch((err) => console.error("Could not load hero list", err));
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(allHeroes, {
      keys: ["name"],
      threshold: 0.2,
    });
  }, [allHeroes])

  const results = query ? fuse.search(query) : []

  const displayItems = results.length > 0
    ? results.map(({ item }) => item)
    : allHeroes;


  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
    else if (e.key === 'Tab') {
      e.preventDefault();
      setQuery(displayItems[0].name);
      handleSearchWithHeroName(displayItems[0].name);
    }
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

  async function handleSearchWithHeroName(heroName) {
    setError(null);
    setHero(null);

    try {
      const data = await getHero(heroName.trim());
      setHero(data);
    } catch (err) {
      setError(err);
    }

  }

  function handleSelectSuggestion(heroName) {
    setQuery(heroName);
    handleSearchWithHeroName(heroName);
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
        suggestions={displayItems}
        onSelectSuggestion={handleSelectSuggestion}
      />
      {error && <p>{error.message + ". Please enter a valid hero."}</p>}
      {hero && <HeroCard hero={hero}/>}
    </>
  )
}

export default HeroLookup;