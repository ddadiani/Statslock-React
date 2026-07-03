import './HeroLookup.css'
import SearchBar from "../components/SearchBar.jsx";
import HeroCard from "../components/HeroCard.jsx";
import {useEffect, useMemo, useState} from "react";
import {getAllHeroes, getHero} from "../services/deadlockApi.js";
import Fuse from 'fuse.js'

function HeroLookup() {
  const [query, setQuery] = useState("");
  const [hero, setHero] = useState(() => {
    return JSON.parse(sessionStorage.getItem("hero-card")) || null;
  });
  const [error, setError] = useState(null);
  const [allHeroes, setAllHeroes] = useState(() => {
    return JSON.parse(sessionStorage.getItem("all-heroes")) || [];
  });

  const fuse = useMemo(() => {
    return new Fuse(allHeroes, {
      keys: ["name"],
      threshold: 0.2,
    });
  }, [allHeroes])

  const results = query ? fuse.search(query) : []

  const displayItems = results.length > 0
    ? results.map(({item}) => item)
    : allHeroes;

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch(query);
    else if (e.key === 'Tab') {
      e.preventDefault();
      setQuery(displayItems[0].name);
      handleSearch(displayItems[0].name);
    }
  }

  function handleClickSearchButton() {
    handleSearch(query);
  }

  async function handleSearch(query) {
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

  function handleSelectSuggestion(heroName) {
    setQuery(heroName);
    handleSearch(heroName);
  }

  useEffect(() => {
    // If sessionStorage has the allHeroes already, don't hit the API
    if (allHeroes.length > 0) return;

    getAllHeroes()
      .then(heroes => heroes.filter(hero => hero.disabled === false))
      .then((filteredHeroes) => {
        setAllHeroes(filteredHeroes);
        sessionStorage.setItem("all-heroes", JSON.stringify(filteredHeroes));
      })
      .catch((err) => console.error("Could not load hero list", err));
  }, [allHeroes.length]);

  useEffect(() => {
    if (hero) sessionStorage.setItem("hero-card", JSON.stringify(hero));
  }, [hero])


  return (
    <>
      <h2>Hero Lookup</h2>
      <SearchBar
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onClickSearchButton={handleClickSearchButton}
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