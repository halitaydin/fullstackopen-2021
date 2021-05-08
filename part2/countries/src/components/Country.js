import React from "react";
import Weather from './Weather'

const Country = ({ country }) => {
  return (
  <div key={country.name}>
    <h2>{country.name}</h2>
    <p>
      <b>Capital:</b> {country.capital}
    </p>
    <p>
      <b>Population:</b> {country.population}
    </p>
    <h3>
      <b>Languages:</b>
    </h3>
    <ul>
      {country.languages.map((language) => {
        return <li key={language.name}>{Object.values(language.name)}</li>;
      })}
    </ul>
    <img
      src={country.flag}
      alt={"country-flag"}
      width={"300px"}
      height={"200px"}
    ></img>
    <Weather country={country}/>
  </div>
  )
};

export default Country;
