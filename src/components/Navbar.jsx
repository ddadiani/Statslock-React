import { NavLink } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      {/*TODO add highlighting on current page for navbar*/}
      <NavLink to="/">
        <h2 className="button" id="player-lookup-button">Player Match History</h2>
      </NavLink>

      <h2 className="button" id="hero-lookup-button">Hero Lore Lookup</h2>
    </nav>
  )
}

export default Navbar;