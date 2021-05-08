import React from "react";

const PersonForm = ({
  handleNameChange,
  handleNumberChange,
  addName,
  newName,
  newNumber,
}) => (
  <form onSubmit={addName}>
    <div>
      name:{" "}
      <input
        placeholder={"a new name..."}
        value={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      number:{" "}
      <input
        placeholder={"a new number"}
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
