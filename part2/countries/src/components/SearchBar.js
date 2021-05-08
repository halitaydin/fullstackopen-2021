import React from "react";

const SearchBar = ({ handleSearch, searched }) => {
  return (
  <div>
    <h1>find countries</h1>
    <input value={searched} onChange={handleSearch} />
  </div>
  )
};

export default SearchBar;
