import React from "react";

const Filter = ({ country, setSearched }) => {
  const showCountry = () => setSearched(country.name)

return (
      <div>
        {country.name} <button onClick={showCountry}>show</button>
      </div>
  ) 
}
export default Filter;
