import './HeroCard.css'

function HeroCard({ hero }) {
  const lore = hero.description?.lore ?? "";
  const isLong = lore.length > 600;

  return (
    <div id="card">
      <div id="card-left">
        <img id="hero-image" src={hero.images.icon_hero_card_webp} alt="hero image" style={{ borderRadius: '10px' }} />
        <h3 className="dynamic-hero-color" id="hero-name" style={{ marginTop: 0, fontSize: '26px' }}>{hero.name}</h3>
      </div>
      <div id="card-right">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="dynamic-hero-color">Lore</h3>
          <p id="lore-text" className={`lore-text ${isLong ? "lore-small" : ""}`}>{hero.description.lore || "..."}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="dynamic-hero-color">Role</h3>
          <p id="role-text">{hero.description.role|| "..."}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="dynamic-hero-color">Playstyle</h3>
          <p id="playstyle-text">{hero.description.playstyle || "..."}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroCard;