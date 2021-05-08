import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => setSearched(event.target.value);

  const result = countries.filter((country) =>
    country.name.toLowerCase().includes(searched.toLowerCase())
  );

  return (
    <div>
      <SearchBar handleSearch={handleSearch} searched={searched} />
      <Countries countries={result} setSearched={setSearched} />
    </div>
  );
};

export default App;
