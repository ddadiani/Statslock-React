import './MatchCard.css'

import {useState} from "react";

function getDaysAgo(daysSinceMatch) {
  switch (daysSinceMatch) {
    case 0:
      return "Today"
    case 1:
      return "Yesterday";
    default:
      return `${daysSinceMatch} days ago`;
  }
}

function getMatchResults(match) {
  if (match.match_result === match.player_team) {
    return "Victory";
  } else {
    return "Defeat";
  }
}

function MatchCard({ match, hero }) {
  const matchDate = new Date(match.start_time * 1000);
  const kills = match.player_kills;
  const deaths = match.player_deaths;
  const assists = match.player_assists;
  const kda = `${kills} / ${deaths} / ${assists}`;
  const kdaAverage = (kills+assists) / deaths;

  const [daysSinceMatch] = useState(() => Math.floor((Date.now() - matchDate) / (1000 * 60 * 60 * 24)))

  if (!match || !hero) return null;
  return (
    <div className="match">
      <div>
        <p className="match-type">{(match.game_mode === 1) ? "Normal" : "Brawl"}</p>
        <p className="days-after-played">{getDaysAgo(daysSinceMatch)}</p>
        <p
          className={"match-result" + (getMatchResults(match) === "Victory" ? " victory" : " defeat")}
        >{getMatchResults(match)}</p>
        <p className="match-length">{`${Math.floor(match.match_duration_s / 60)}m ${match.match_duration_s % 60}s`}</p>
      </div>
      <div>
        <img src={hero.images.icon_image_small_webp} alt="hero" className="hero-image-player"/>
        <p className="hero-level">Level {match.hero_level}</p>
        <p className="kda">KDA: {kda} ({kdaAverage.toPrecision(2)})</p>
      </div>
      <div>
        <p className="souls">{`Souls: ${(match.net_worth / 1000).toPrecision(3)}K`}</p>
        <p className="last-hits">{`Last hits: ${match.last_hits} (${(match.last_hits / (match.match_duration_s / 60)).toFixed(1)})`}</p>
        <p className="denies">{`Denies: ${match.denies}`}</p>
      </div>
    </div>
  )
}

export default MatchCard;