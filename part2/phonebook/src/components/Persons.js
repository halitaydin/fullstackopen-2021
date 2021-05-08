import React from "react";

const Persons = ({ results, deletePerson }) => {
  return results.map((person) => (
    <p key={person.id}>
      {person.name}
      {":"} {person.number}{" "}
      {
        <button
          onClick={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
              deletePerson(person.id);
            }
          }}
        >
          delete
        </button>
      }
    </p>
  ));
};

export default Persons;
