import './SearchBar.css'
import searchIcon from '../assets/search_icon_white.png'

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" id="player-input" placeholder="Enter hero name..."/>
      <img className="button" id="search-button" src={searchIcon} alt="search icon"/>
    </div>
  )
}

export default SearchBar;