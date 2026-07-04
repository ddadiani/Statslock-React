import './HeroTierList.css'
import {useEffect, useState} from "react";
import {getAllHeroes, getHeroStats, getTotalMatches} from "../services/deadlockApi.js";

function HeroTierList() {
  const [heroMap, setHeroMap] = useState(() => {
    return JSON.parse(sessionStorage.getItem("hero-map")) || {};
  });
  const [stats, setStats] = useState(() => {
    return JSON.parse(sessionStorage.getItem("hero-stats")) || {};
  });
  const [totalMatches, setTotalMatches] = useState(() => {
    return JSON.parse(sessionStorage.getItem("total-matches")) || null;
  })
  const [error, setError] = useState(null);

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
  }, [])

  // Get hero stats and totalMatches, and store a stats variable with all necessary info
  useEffect(() => {
    // If there's both stats and totalMatches in the session storage, don't run
    if (stats.length > 0 && totalMatches) return;

    async function loadStats() {
      try {
        const heroStats = await getHeroStats();
        const totalMatchesJson = await getTotalMatches();
        const totalMatches = totalMatchesJson[0].total_matches;

        const combined = heroStats.map((s) => (
          {
            ...s,
            winrate: (s.wins / s.matches) * 100,
            pickrate: (s.matches / totalMatches) * 100,
            avgKills: s.total_kills / s.matches,
            avgDeaths: s.total_deaths / s.matches,
            avgAssists: s.total_assists / s.matches,
            avgKda: (s.total_kills + s.total_assists) / s.total_deaths,
          }
        ))

        const sortedStats = combined.sort((a, b) => b.winrate - a.winrate);
        setStats(sortedStats);
        sessionStorage.setItem("hero-stats", JSON.stringify(sortedStats));
        setTotalMatches(totalMatches);
        sessionStorage.setItem("total-matches", JSON.stringify(totalMatches));
      } catch (err) {
        setError(err);
      }
    }

    // Run the function
    loadStats()
  }, [])

  return (
    <>
      {error && <p>{error.message}</p>}

        <h2>Hero Tier List</h2>
        {stats && totalMatches && (
          <table id="tier-list">
            <thead>
            <tr>
              <th>Hero</th>
              <th>Winrate</th>
              <th>Pickrate</th>
              <th>KDA</th>
              <th>Win / Loss</th>
            </tr>
            </thead>
            <tbody>
            {stats.map((s) => (
              <tr key={s.hero_id} className="hero-stat">
                <td className="hero-cell">
                  <img src={heroMap[s.hero_id].images.icon_image_small_webp} alt={heroMap[s.hero_id].name}/>
                  <p>{heroMap[s.hero_id].name}</p>
                </td>
                <td
                  className={`winrate ${(s.winrate) >= 50 ? "victory" : "defeat"}`}
                >
                  {Math.trunc(s.winrate * 10) / 10}%
                </td>
                <td>{s.pickrate.toFixed(1)}%</td>
                <td>{s.avgKda.toFixed(2)}</td>
                <td>{Math.floor(s.wins / 1000)}K / {Math.floor(s.losses / 1000)}K</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
    </>
  )
}

export default HeroTierList;