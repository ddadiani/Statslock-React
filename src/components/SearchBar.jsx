import './SearchBar.css'
import searchIcon from '../assets/search_icon_white.png'

function SearchBar({ query, onChange, onKeyDown, onSearch, placeholder, hasError }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        id="player-input"
        className={hasError ? "error-input" : ""}
        placeholder={placeholder}
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <img
        className="button"
        id="search-button"
        src={searchIcon}
        alt="search icon"
        onClick={onSearch}
      />
    </div>
  )
}

export default SearchBar;