import React from "react";

const Filter = ({ handleFilterChange }) => (
  <div>
    filter shown with:{" "}
    <input placeholder={"search"} onChange={handleFilterChange} />
  </div>
);

export default Filter;
