import './SearchBar.css'
import searchIcon from '../assets/search_icon_white.png'
import {useState} from "react";

function SearchBar({ query, onChange, onKeyDown, onSearch, onSelectSuggestion,
                     placeholder, hasError, suggestions = [] }) {
  const [isFocused, setIsFocused] = useState(false)

  const showSuggestions = isFocused && suggestions.length > 0;

  function handleSelect(heroName) {
    onSelectSuggestion(heroName);
    setIsFocused(false);
  }


  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          className={"search-input" + (hasError ? " error-input" : "")}
          placeholder={placeholder}
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {suggestions && showSuggestions && (
          <ul className="search-bar-suggestions">
            {suggestions.map((hero) => (
              <li
                key={hero.id}
                className="search-bar-suggestion-item"
                onMouseDown={() => handleSelect(hero.name)}
              >
                {hero.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <img
        className="button"
        id="search-button"
        src={searchIcon}
        alt="search icon"
        onClick={() => onSearch()}
      />
    </div>
  )
}

export default SearchBar;