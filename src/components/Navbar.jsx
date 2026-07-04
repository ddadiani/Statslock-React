import {NavLink} from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/match-history"
        className={({isActive}) => `button ${isActive ? "navbar-button-active" : ""}`}
      >
        <h2 className="button" id="player-lookup-button">Player Match History</h2>
      </NavLink>

      <NavLink
        to="/hero-lookup"
        className={({isActive}) => `button ${isActive ? "navbar-button-active" : ""}`}
      >
        <h2 className="button" id="hero-lookup-button">Hero Lore Lookup</h2>
      </NavLink>

      <NavLink
        to={"/hero-tier-list"}
        className={({isActive}) => `button ${isActive ? "navbar-button-active" : ""}`}
      >
        <h2 className="button" id="hero-tier-list">Tier List</h2>
      </NavLink>
    </nav>
  )
}

export default Navbar;