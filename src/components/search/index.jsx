import "./search.css";

function Search({ searchInput, setSearchInput, handleSearch }) {
  return (
    <div className="search-bar">
      <input
        placeholder="Enter city name"
        type="text"
        className="search-field"
        name="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Search;
