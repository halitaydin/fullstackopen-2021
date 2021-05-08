import React from "react";
import Country from "./Country";
import Filter from "./Filter";

const Countries = ({ countries, setSearched }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length > 1) {
    return countries.map((country) => (
      <Filter
        key={country.name}
        country={country}
        setSearched={setSearched}
      />
    ));
  } else {
    return <div>No countries match your search!</div>;
  }
};

export default Countries;
