function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" id="hero-input" placeholder="Enter hero name..."/>
      <img className="button" id="search-button" src="assets/search_icon.png" alt="search icon"/>
    </div>
  )
}

export default SearchBar;