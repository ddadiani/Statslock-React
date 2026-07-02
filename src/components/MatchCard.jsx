function MatchCard({ match, hero }) {
  return (
    <div className="match">
      <div>
        <p className="match-type">{}</p>
        <p className="days-after-played"></p>
        <p className="match-id"></p>
        <p className="match-result"></p>
        <p className="match-length"></p>
      </div>
      <div>
        <img src="" alt="hero" className="hero-image-player"/>
        <p className="hero-level"></p>
        <p className="kda"></p>
        <p className="kda-average"></p>
      </div>
      <div>
        <p className="souls"></p>
        <p className="last-hits"></p>
        <p className="denies"></p>
      </div>
    </div>
  )
}